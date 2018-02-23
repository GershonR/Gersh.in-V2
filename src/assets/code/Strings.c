<----------------------------------------------------- string.h ----------------------------------------------------->
// C does not have "Strings", this code implements "String-like" functionality in C

#ifndef _MY_STRING_H
#define _MY_STRING_H

typedef enum BOOLEAN {false, true} boolean;

typedef struct STRING String;

// the String Object
String * newString( char const * const init );
String * destroyString( String *theString );
void printString( String const * const theString );
char charAt( String const * const theString, const int index );
String * concat( String const * const string1, String const * const string2 );
boolean equals(String const * const theString, char const * const expected);

boolean validateMemUse();

#endif

<----------------------------------------------------- string.c ----------------------------------------------------->

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>
#include "string.h" 

//-------------------------------------------------------------------------------------
// CONSTANTS and TYPES
//-------------------------------------------------------------------------------------

struct STRING
{
  int size;
  char *theString;
};

//-------------------------------------------------------------------------------------
// VARIABLES
//-------------------------------------------------------------------------------------

// lets me track strings so I know they're all deleted properly
static int stringCount = 0;

//-------------------------------------------------------------------------------------
// PROTOTYPES
//-------------------------------------------------------------------------------------

static void validateString( String const * const theString );

//-------------------------------------------------------------------------------------
// FUNCTIONS
//-------------------------------------------------------------------------------------

// the invariant
static void validateString( String const * const theString )
{
  assert( NULL != theString );
  assert( NULL != theString->theString );
  // what is a String?
  assert ( '\0' == theString->theString[theString->size] );
  // note that strlen() walks the array for us -- time consuming but checks for extra '\0' chars
  // but we don't want the extra time in the release version...
  assert( theString->size == strlen( theString->theString ) );

  // can we really do anything with the contents?
  // we manage strings, strings of any size and set of characters.
  // if, however, we were censoring strings... then we have to validate our modifications to contents
}

String * newString( char const * const init )
{
  String *newString = NULL;
  
  // what happens when we use -DNDEBUG?
  assert( NULL != init );
  
  newString = malloc( sizeof( String ) );
  // always check allocations...
  assert( NULL != newString );
  
  // always make sure the allocation succeeded
  if ( NULL != newString )
  {
    newString->theString = malloc( strlen( init ) + 1 );
    assert( NULL != newString->theString );
    
    if ( NULL != newString->theString )
    {
      strcpy( newString->theString, init );
      newString->size = strlen( newString->theString );
      
      assert( newString->size == strlen( init ) );
      
      stringCount++;
    }
    
    // not enough memory, clean up
    else
    {
      free( newString );
      // set ptr to NULL so we don't illegally reference it
      newString = NULL;
    }
  }
  
  validateString( newString );
  
  // don't use a struct declaration...
  // struct assignment doesn't do deep copying
  return newString;
}

String * destroyString( String *theString )
{
  validateString( theString );
  assert( stringCount > 0 );
  
  // ordering is VERY important
  // ALWAYS check pointers before dereferencing to make sure we don't crash!

  // should we put these checks in validateString() and have it return a boolean?
  // good question! not here, since validate string does much more that we don't need.
  // there will be cases (future assignments...) where it makes sense to have something returned.
  // but only if *for release* we don't incur significant overhead.
  // (these comments should be repeated in all like routines)

  if ( NULL != theString && NULL != theString->theString )
    free( theString->theString );
  if ( NULL != theString )
    free( theString );
  theString = NULL;
  
  stringCount--;
  
  return theString;
}


boolean equals(String const * const theString, char const * const expected)
{
  boolean equal = false;
  
  validateString(theString);
  assert(NULL != expected);

  if ( NULL != theString && NULL != theString->theString && NULL != expected)
  {
    if (strncmp(theString->theString, expected, theString->size) == 0)
      equal = true;
  }

  return equal;
}

void printString( String const * const theString )
{
  validateString( theString );
  
  // ALWAYS check pointers before dereferencing to make sure we don't crash!
  if ( NULL != theString && NULL != theString->theString )
    printf( "%*s\n", theString->size, theString->theString );
}

char charAt( String const * const theString, const int index )
{
  char theChar = '\0';     // assume null terminator for failure conditions
  
  validateString( theString );
  // index must be in the String
  assert( index >= 0 );
  assert( index < theString->size );
  
  // ALWAYS check pointers before dereferencing to make sure we don't crash!
  if ( NULL != theString && NULL != theString->theString )
  {
    // we have to make sure that we don't go out of bounds!
    if ( index >= 0 && index < theString->size )
      theChar = theString->theString[index];
  }
  
  return theChar;
}

String * concat( String const * const string1, String const * const string2 )
{
  String *newString = NULL;
  
  validateString( string1 );
  validateString( string2 );
  
  // ALWAYS check pointers before dereferencing to make sure we don't crash!
  if ( NULL != string1 && NULL != string1->theString && NULL != string2 && NULL != string2->theString )
  {
    newString = malloc( sizeof( String ) );
    assert( NULL != newString );
    
    if ( NULL != newString )
    {
      newString->size = string1->size + string2->size;
      newString->theString = malloc( newString->size + 1 );
      assert( NULL != newString->theString );
      
      if ( NULL != newString->theString )
      {
        strcpy( newString->theString, string1->theString );
        strcpy( &(newString->theString[string1->size]), string2->theString );
        
        assert( newString->size == strlen( newString->theString ) );
        // verify that the 2 strings are in the correct locations
        assert( newString->theString[0] == string1->theString[0] );
        assert( newString->theString[string1->size] == string2->theString[0] );
        
        validateString( newString );
        
        stringCount++;
      }
      else
      {
        free( newString );
        newString = NULL;
      }
    }
  }
  
  return newString;
}

boolean validateMemUse()
{
  return (stringCount == 0);
}