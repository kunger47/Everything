using everything.Controllers;
using everything.Data;
using everything.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace everything.Core
{
    public class ToDoItemUpdater
    {
        readonly EverythingContext _context;

        public ToDoItemUpdater(EverythingContext context)
        {
            _context = context;
        }

        public void AddToDoItem(CreateToDoItemMessage message)
        {
            var column = GetColumn(message.ToDoColumnId);
            var newItem = new ToDoItem { CreatedDate = DateTime.Now };
            UpdateItemFromMessage(newItem, message);
            column.ToDoItems.Add(newItem);
            ResequenceItemsAfterAdd(message, column);
        }

        public void UpdateToDoItem(UpdateToDoItemMessage message)
        {
            var selectedItem = GetToDoItem(message.Id);
            var column = GetColumn(message.ToDoColumnId);
            if (selectedItem != null)
            {
                var originalSequence = selectedItem.Sequence;
                var originalColumn = GetColumn(selectedItem.ToDoColumnId);
                UpdateItemFromMessage(selectedItem, message);

                if (originalColumn.Id != message.ToDoColumnId)
                {
                    column.ToDoItems.Add(selectedItem);
                    originalColumn.ToDoItems.Remove(selectedItem);
                }

                ResequenceItemsAfterUpdate(message, column, originalColumn, originalSequence);
            }
        }

        public void RemoveToDoItem(int itemId)
        {
            var selectedItem = GetToDoItem(itemId);

            if (selectedItem != null)
            {
                foreach (var task in selectedItem.Tasks)
                    _context.ToDoItemTasks.Remove(task);

                ResequenceAfterItemDelete(selectedItem.ToDoColumn, selectedItem);
            }
        }

        private ToDoItem GetToDoItem(int itemId)
        {
            return _context.ToDoItems
                .Include(i => i.ToDoColumn)
                    .ThenInclude(c => c.ToDoItems)
                .FirstOrDefault(i => i.Id == itemId);
        }

        private void UpdateItemFromMessage(ToDoItem item, BaseToDoItemMessage message)
        {
            item.Name = message.Name;
            item.Sequence = message.Sequence;
            item.Description = message.Description;
            item.DueDate = message.DueDate;
            item.ToDoColumnId = message.ToDoColumnId;
        }

        private void ResequenceItemsAfterAdd(BaseToDoItemMessage message, ToDoColumn column)
        {
            var itemList = column.ToDoItems.ToList();

            foreach (var item in itemList.Where(t => t.Id != 0))
                if (item.Sequence >= message.Sequence)
                    item.Sequence++;

            ResequenceGivenItems(itemList);
        }

        private void ResequenceItemsAfterUpdate(UpdateToDoItemMessage message, ToDoColumn column, ToDoColumn originalColumn, int originalSequence)
        {
            if (originalColumn.Id != message.ToDoColumnId)
            {
                var itemList = column.ToDoItems.ToList();
                HandleMovingItemUp(message, itemList);

                ResequenceGivenItems(originalColumn.ToDoItems.ToList());
            }
            else if (originalSequence != message.Sequence)
            {
                var itemList = column.ToDoItems.ToList();

                if (originalSequence >= message.Sequence)
                    HandleMovingItemUp(message, itemList);
                else
                    HandleMovingItemDown(message, itemList);
            }
        }

        private void HandleMovingItemUp(UpdateToDoItemMessage message, List<ToDoItem> itemList)
        {
            foreach (var item in itemList.Where(t => t.Id != message.Id))
                if (item.Sequence >= message.Sequence)
                    item.Sequence++;

            ResequenceGivenItems(itemList);
        }

        private void HandleMovingItemDown(UpdateToDoItemMessage message, List<ToDoItem> itemList)
        {
            foreach (var item in itemList.Where(t => t.Id != message.Id))
                if (item.Sequence <= message.Sequence)
                    item.Sequence--;

            ResequenceGivenItems(itemList);
        }

        private void ResequenceGivenItems(List<ToDoItem> itemList)
        {
            if (itemList != null)
            {
                var itemListOrderedBySeqence = itemList.OrderBy(t => t.Sequence).ToArray();

                for (var i = 0; i < itemListOrderedBySeqence.Count(); i++)
                    itemListOrderedBySeqence[i].Sequence = i;
            }
        }

        private void ResequenceAfterItemDelete(ToDoColumn column, ToDoItem deletedItem)
        {
            _context.ToDoItems.Remove(deletedItem);
            var itemList = column.ToDoItems.ToList();
            ResequenceGivenItems(itemList);
        }

        private ToDoColumn GetColumn(int columnId)
        {
            var column = _context.ToDoColumns
                .Include(c => c.ToDoItems)
                .FirstOrDefault(c => c.Id == columnId);
            if (column == null)
                throw new Exception();
            return column;
        }
    }
}
