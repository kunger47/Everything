using everything.Controllers;
using everything.Data;
using everything.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace everything.Core
{
    public class TripPackingItemUpdater
    {
        readonly EverythingContext _context;

        public TripPackingItemUpdater(EverythingContext context)
        {
            _context = context;
        }

        public void AddTripPackingItem(CreateTripPackingItemMessage message)
        {
            var trip = Getrip();
            var newItem = new TripPackingItem();
            UpdateItemFromMessage(newItem, message);
            trip.TripPackingItems.Add(newItem);
            ResequenceItemsAfterAdd(message, trip);
        }

        public void UpdateTripPackingItem(UpdateTripPackingItemMessage message)
        {
            var selectedItem = GetTripPackingItem(message.Id);
            var trip = Getrip();
            if (selectedItem != null)
            {
                var originalSequence = selectedItem.Sequence;
                UpdateItemFromMessage(selectedItem, message);
                ResequenceItemsAfterUpdate(message, trip, originalSequence);
            }
        }

        //public void RemoveTripPackingItem(int itemId)
        //{
        //    var selectedItem = GetTripPackingItem(itemId);

        //    if (selectedItem != null)
        //    {
        //        foreach (var link in selectedItem.TagLinks)
        //            _context.TagForPackingItems.Remove(link);

        //        ResequenceAfterItemDelete(selectedItem.User, selectedItem);
        //    }
        //}

        private TripPackingItem GetTripPackingItem(int itemId)
        {
            return _context.TripPackingItems
                //.Include(i => i.Trip)
                //    .ThenInclude(c => c.TripPackingItems)
                .FirstOrDefault(i => i.Id == itemId);
        }

        private void UpdateItemFromMessage(TripPackingItem item, SequencedTripPackingItemMessage message)
        {
            item.Sequence = message.Sequence;
        }

        private void ResequenceItemsAfterAdd(SequencedTripPackingItemMessage message, Trip trip)
        {
            var itemList = trip.TripPackingItems.ToList();

            foreach (var item in itemList.Where(t => t.Id != 0))
                if (item.Sequence >= message.Sequence)
                    item.Sequence++;

            ResequenceGivenItems(itemList);
        }

        private void ResequenceItemsAfterUpdate(UpdateTripPackingItemMessage message, Trip trip, int originalSequence)
        {
            if (originalSequence != message.Sequence)
            {
                var itemList = trip.TripPackingItems.ToList();

                if (originalSequence >= message.Sequence)
                    HandleMovingItemUp(message, itemList);
                else
                    HandleMovingItemDown(message, itemList);
            }
        }

        private void HandleMovingItemUp(UpdateTripPackingItemMessage message, List<TripPackingItem> itemList)
        {
            foreach (var item in itemList.Where(t => t.Id != message.Id))
                if (item.Sequence >= message.Sequence)
                    item.Sequence++;

            ResequenceGivenItems(itemList);
        }

        private void HandleMovingItemDown(UpdateTripPackingItemMessage message, List<TripPackingItem> itemList)
        {
            foreach (var item in itemList.Where(t => t.Id != message.Id))
                if (item.Sequence <= message.Sequence)
                    item.Sequence--;

            ResequenceGivenItems(itemList);
        }

        private void ResequenceGivenItems(List<TripPackingItem> itemList)
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

        private Trip Getrip()
        {
            var trip = _context.Trips
                .Include(c => c.TripPackingItems)
                .FirstOrDefault();
            if (trip == null)
                throw new Exception();
            return trip;
        }
    }
}
