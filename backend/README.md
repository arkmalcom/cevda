# Python

I needed a quick email-handler and set it up using a stack I'm already familiar with. I used Python and AWS Lambda.

There's nothing special there.

# Go

I wanted to learn Golang which is why there's also a bunch of Go in this part of the repo. 

I tried to follow some patterns I found online like the repository pattern, but I'm not sure if I applied them correctly.

Some of the conventions I'm familiar with in Python seem to be discouraged in Go.

I would normally be used to creating generic functions that can be reused (like the base table creation function I made),
but it seems Go often favors specific functions even if there's a bit of duplication.

For example, I tried to find a good pattern to serialize data between DDB and in-memory object manipulation, 
but what I read seemed to encourage that instead of some sort of generic `toDynamo` or `fromDynamo` function I instead
wrote functions for each data structure that handled the data the way I needed to. Thus, `fromDynamnoQuestion` is born.

I put what would become the executables in a "command" path and divided it between "api" and "seed"

"Seed" is essentially what I use as a one-time execution for data migrations. I need to be able to 
initially populate the questions table with some data, and doing it programmatically is the best option.

Locally this works great, but I have to check how I'm going to handle this in a lambda once I deploy it.
