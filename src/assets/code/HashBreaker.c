// Gershon Reydman
// www.gersh.in

#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

#include "hash_test.h"

#define THREAD_COUNT 12
#define WORD_LENGTH 20

struct arg_struct {
    char* hash;
    int work_spot;
};

void submit_work(char* hash);
void* crack_password(void * arg);
int brute_force(char* str, int index, int depth, struct arg_struct arg);
void read_file(void * arg);


// thread stuff
bool work_available = false;
pthread_mutex_t signalLock;
pthread_cond_t signalAvailable;

// password cracking
const char alphabet[] = "abcdefghijklmnopqrstuvwxyz";
const int alphabet_size = sizeof(alphabet) - 1;

// storage
struct arg_struct *work[100];
struct arg_struct *(*p)[] = &work;
int current_work = 0;
int created_work = 0;
int worker_threads[THREAD_COUNT];
int work_counts[100];


int main(void) {
	printf("Running with %d threads\n", THREAD_COUNT);

    pthread_cond_init(&signalAvailable, NULL);
    pthread_mutex_init(&signalLock, NULL);

	read_file("passwords.txt");

    pthread_mutex_destroy(&signalLock);
    pthread_cond_destroy(&signalAvailable);

	return EXIT_SUCCESS;
}

/**
 * Read the file, assign work and create threads
 */
void read_file(void * arg) {
    FILE* file = fopen(arg, "r");
    char line[256];
    pthread_t thread_id[THREAD_COUNT];

    // create work
    while (fgets(line, sizeof(line), file)) {
    	line[strcspn(line, "\n")] = 0; // Remove new line char
    	submit_work(line);
    }

    // create threads
    for(int i=0;i<THREAD_COUNT;i++) {
    		pthread_create (&thread_id[i], NULL , &crack_password, NULL);
    }

    // join threads
    for(int j=0;j<THREAD_COUNT;j++) {
    	pthread_join(thread_id[j], NULL);
    }

    fclose(file);
}

/**
 * Adds a calculation task to queue.
 */
void submit_work(char* hash) {
    /* lock the queue to avoid thread access */
    pthread_mutex_lock(&signalLock);

    /* dynamically allocate a work task */
    work[created_work] = malloc(sizeof(struct arg_struct));
    (*p)[created_work]->hash = (char*) malloc(sizeof(char)*300);

    strcpy((*p)[created_work]->hash, hash);
	(*p)[created_work]->work_spot = current_work;
    work_available = true;
    created_work++;

    /* signal a thread that it should check for new work */
    pthread_cond_signal(&signalAvailable);

    /* free the lock */
    pthread_mutex_unlock(&signalLock);
}

/**
 * Attempt to crack a hash.
 */
void* crack_password(void * arg) {
	while(current_work < created_work) {
		pthread_mutex_lock(&signalLock);
		while(!work_available) {
			pthread_cond_wait(&signalAvailable, &signalLock);
		}

		/** copy the work **/
		struct arg_struct currwork;
		currwork.hash = (*p)[current_work]->hash;
		currwork.work_spot = current_work;
		work_available = false;
		if(current_work < created_work)
			work_available = true;
		current_work++;

		/* free the lock */
		pthread_mutex_unlock(&signalLock);
		/* signal a thread that it should check for new work */
		pthread_cond_signal(&signalAvailable);

		char* buf = malloc(WORD_LENGTH + 1);
		for (int i = 1; i <= WORD_LENGTH; ++i)
		{
			buf[i]='\0';
			int result = brute_force(buf, 0, i, currwork);
			if(result == 1) {
				break;
			}
		}
	}
	return 0;
}

/**
 * Recurisvely break the hash
 */
int brute_force(char* str, int index, int depth, struct arg_struct arg)
{
    for (int i = 0; i < alphabet_size; ++i)
    {
        str[index] = alphabet[i];
        if (index == depth - 1) {
        	bool result = same(str, arg.hash);
        	if (result == 1) {
        		/* lock the queue to avoid thread access */
        		pthread_mutex_lock(&signalLock);
        		printf("%s plaintext %s", arg.hash, str);
        		printf(" took %d comparisons work spot %d \n", work_counts[arg.work_spot], arg.work_spot);
        		/* free the lock */
        		pthread_mutex_unlock(&signalLock);
        		return 1;
        	}
        	work_counts[arg.work_spot]++;
        }
        else
        	if(brute_force(str, index + 1, depth, arg) == 1)
        		return 1;
    }
    return -1;
}
