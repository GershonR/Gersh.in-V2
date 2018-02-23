<----------------------------------------------------- table.h ----------------------------------------------------->

#ifndef _TABLE_H
#define _TABLE_H

//-----------------------------------------------------------------------------
// CONSTANTS AND TYPES
//-----------------------------------------------------------------------------

typedef enum BOOL {
	false, true
} Boolean;

//-----------------------------------------------------------------------------
// PROTOTYPES
//-----------------------------------------------------------------------------

// add an element to the table
// Return TRUE if the item is in the table
// Return FALSE if the item is *not* in the table
Boolean insertItem(int item);
// removes the int from the table
Boolean removeItem(int item);
// empty the table so that we clear all memory and can start a fresh table
void clearTable();
// tells us whether or not the given item is in the table
Boolean search(int item);
// table iterators
// Return TRUE if item was assigned
// Return FALSE if item was *not* assigned
Boolean firstItem(int * const item);
Boolean nextItem(int * const item);

#endif

<----------------------------------------------------- table.c ----------------------------------------------------->

#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include "table.h"

// Linked list node definition
typedef struct Node node;

struct Node
{
  	int   number;
  	node  *next;
};

static node *top = NULL;
 
// used to track where we are for the list traversal methods
static node *traverseNode = NULL;

// add an element to the table
// Return TRUE if the item is in the table
// Return FALSE if the item is *not* in the table
Boolean insertItem( int item );

// removes the int from the table
Boolean removeItem( int item );

// empty the table so that we clear all memory and can start a fresh table
void clearTable( );

// print table
void printTable();
    
// empty the table so that we clear all memory and can start a fresh table
void clearTable()
{
  traverseNode = top;
  node *temp = NULL;

  while ( traverseNode != NULL )
  {
    // flip order to see it blow up...
    temp = traverseNode;
    traverseNode = traverseNode->next;

    free( temp );
  }

  top = NULL;
  traverseNode = NULL;
}


// "build" will create an ordered linked list consisting
// of the first "size" even integers.
void build( int size )
{
  node *newNode = NULL;
  int i = 0;

  // make sure we don't have a list yet
  clearTable();

  for ( i=size ; i>0 ; i-- )
  {
    newNode = malloc( sizeof( node ) );
    newNode->number = i*2;
    newNode->next = top;

    top = newNode;
  }
}


// starts a list traversal by getting the data at top.
// returns false if top == NULL.
Boolean firstItem( int *item )
{
  Boolean result = false;
  
  if ( top )
  {
    *item = top->number;
    
    traverseNode = top->next;
  
    result = true;
  }  
  
  return result;
}


// gets the data at the current traversal node and increments the traversal.
// returns false if we're at the end of the list.
Boolean nextItem( int *item )
{
  Boolean result = false;
  //assert(traverseNode != NULL);
  if ( traverseNode != NULL )
  {
    *item = traverseNode->number;

    traverseNode = traverseNode->next;
    
    result = true;
  }
  return result;
}

// add an element to the table
// Return TRUE if the item is in the table
// Return FALSE if the item is *not* in the table
Boolean insertItem( int item ) {
	node *newNode = NULL;
	Boolean result = false;
	node *curr = top;
	newNode = malloc( sizeof( node ) );
	newNode->number = item;

	if(top == NULL) { // Create the list
		top = newNode;
		newNode->next = NULL;
		result = true;
	} else if (top->number > item) { // Replace top
		newNode->next = top;
		top = newNode;
		result = true;
	}

	while(!result && curr->next != NULL && curr->next->number < item) {
		curr = curr->next;
	}

	if(!result) { // Do very last or in between
		newNode->next = curr->next;
		curr->next = newNode;
		result = true;
	}
	traverseNode = top;
	assert(top != NULL); // We must have atleast created something
	return result;
}

// removes the int from the table
Boolean removeItem( int item ) {
	assert(top != NULL);
	Boolean result = false;
	node *prev = NULL;
	traverseNode = top;
	while(traverseNode != NULL && traverseNode->number != item) { // Move until curr is what we need
			prev = traverseNode;
			traverseNode = traverseNode->next;
	}
	if(traverseNode != NULL && traverseNode->number == item) {
			if(traverseNode->number == top->number) { // Removing first item
				prev = top;
				top = top->next;
				free(prev);
				result = true;
			} else {
				prev->next = traverseNode->next; /// Removing everything else
				free(traverseNode);
				result = true;
			}
	}
	return result;
}

// tells us whether or not the given item is in the table
Boolean search( int item ) {
	Boolean result = false;
	traverseNode = top;
	while(traverseNode != NULL) {
		if(traverseNode->number == item)
			result = true;
		traverseNode = traverseNode->next;
	}
	return result;
}

