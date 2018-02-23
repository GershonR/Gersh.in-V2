// Different fibanacci algorithms that have different running times

#include <stdio.h>
#include <stdlib.h>
#include <time.h>


long regFib(int n)
{
  long result;
  
  if (n==0)
    result = 0;
  else if (n==1 || n==2)
    result = 1;
  else
    result = regFib(n-1) + regFib(n-2);
  
  return result;
}

long cacheFib(int n)
{
  long result;
  static int cache[] = {};
  if(n < 3) {
	  if(n == 2)
		  n--;
	  cache[n] = n;
	  result = n;
  }
  if(cache[n])
	  result = cache[n];
  else
    result = cacheFib(n-1) + cacheFib(n-2);
  
  return result;
}


long evenFib(int n)
{
  long result;
  static int cache[] = {};
  if(n < 3) {
	  if(n == 2)
		  n--;
	  cache[n] = n;
	  result = n;
  }
  if(n / 2 == 0 && cache[n])
	  result = cache[n];
  else
    result = evenFib(n-1) + evenFib(n-2);
  
  return result;
}

long evenFibMax(int n)
{
  long result;
  static int cache[CACHE_SIZE] = {0};
  static int numCache = 0;
  if(numCache < CACHE_SIZE && n / 2 == 0 && cache[n]) {
	result = cache[n];
  } else if(n < 3) {
	  if(n == 2)
		  n--;
	  if(numCache < CACHE_SIZE) {
		cache[n] = 1;
		numCache++;
	  }
	  result = 1;

  } else
    result = evenFibMax(n-1) + evenFibMax(n-2);
  
  return result;
}

long fibMax(int n)
{
  long result;
  static int cache[CACHE_SIZE] = {0};
  static int numCache = 0;
  if(numCache < CACHE_SIZE && cache[n]) {
	result = cache[n];
  } else if(n < 3) {
	  if(n == 2)
		  n--;
	  if(numCache < CACHE_SIZE) {
		cache[n] = n;
		numCache++;
	  }
	  result = n;

  } else
    result = fibMax(n-1) + fibMax(n-2);
  
  return result;
}