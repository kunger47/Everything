using everything.Controllers;
using everything.Data;
using everything.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace everything.Core
{
    public class PackingItemUpdater
    {
        readonly EverythingContext _context;

        public PackingItemUpdater(EverythingContext context)
        {
            _context = context;
        }

        public void AddPackingItem(CreatePackingItemMessage message)
        {
            var user = GetUser();
            var newItem = new PackingItem();
            UpdateItemFromMessage(newItem, message);
            user.PackingItems.Add(newItem);
            ResequenceItemsAfterAdd(message, user);
        }

        public void UpdatePackingItem(UpdatePackingItemMessage message)
        {
            var selectedItem = GetPackingItem(message.Id);
            var user = GetUser();
            if (selectedItem != null)
            {
                var originalSequence = selectedItem.Sequence;
                UpdateItemFromMessage(selectedItem, message);
                ResequenceItemsAfterUpdate(message, user, originalSequence);
            }
        }

        //public void RemovePackingItem(int itemId)
        //{
        //    var selectedItem = GetPackingItem(itemId);

        //    if (selectedItem != null)
        //    {
        //        foreach (var link in selectedItem.TagLinks)
        //            _context.TagForPackingItems.Remove(link);

        //        ResequenceAfterItemDelete(selectedItem.User, selectedItem);
        //    }
        //}

        private PackingItem GetPackingItem(int itemId)
        {
            return _context.PackingItems
                .Include(i => i.User)
                    .ThenInclude(c => c.PackingItems)
                .FirstOrDefault(i => i.Id == itemId);
        }

        private void UpdateItemFromMessage(PackingItem item, BasePackingItemMessage message)
        {
            item.Name = message.Name;
            item.Sequence = message.Sequence;
            item.Description = message.Description;
        }

        private void ResequenceItemsAfterAdd(BasePackingItemMessage message, User user)
        {
            var itemList = user.PackingItems.ToList();

            foreach (var item in itemList.Where(t => t.Id != 0))
                if (item.Sequence >= message.Sequence)
                    item.Sequence++;

            ResequenceGivenItems(itemList);
        }

        private void ResequenceItemsAfterUpdate(UpdatePackingItemMessage message, User user, int originalSequence)
        {
            if (originalSequence != message.Sequence)
            {
                var itemList = user.PackingItems.ToList();

                if (originalSequence >= message.Sequence)
                    HandleMovingItemUp(message, itemList);
                else
                    HandleMovingItemDown(message, itemList);
            }
        }

        private void HandleMovingItemUp(UpdatePackingItemMessage message, List<PackingItem> itemList)
        {
            foreach (var item in itemList.Where(t => t.Id != message.Id))
                if (item.Sequence >= message.Sequence)
                    item.Sequence++;

            ResequenceGivenItems(itemList);
        }

        private void HandleMovingItemDown(UpdatePackingItemMessage message, List<PackingItem> itemList)
        {
            foreach (var item in itemList.Where(t => t.Id != message.Id))
                if (item.Sequence <= message.Sequence)
                    item.Sequence--;

            ResequenceGivenItems(itemList);
        }

        private void ResequenceGivenItems(List<PackingItem> itemList)
        {
            if (itemList != null)
            {
                var itemListOrderedBySeqence = itemList.OrderBy(t => t.Sequence).ToArray();

                for (var i = 0; i < itemListOrderedBySeqence.Count(); i++)
                    itemListOrderedBySeqence[i].Sequence = i;
            }
        }

        //private void ResequenceAfterItemDelete(User user, PackingItem deletedItem)
        //{
        //    _context.PackingItems.Remove(deletedItem);
        //    var itemList = user.PackingItems.ToList();
        //    ResequenceGivenItems(itemList);
        //}

        private User GetUser()
        {
            var user = _context.Users
                .Include(c => c.PackingItems)
                .FirstOrDefault();
            if (user == null)
                throw new Exception();
            return user;
        }
    }
}
