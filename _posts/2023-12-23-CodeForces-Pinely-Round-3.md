---
layout: post
title: CodeForces Pinely Round 3
description: I love Div 1+2's.
tags: [problem-solving, contest]
usemathjax: true
---

I am very happy with my performance in the round despite not participating for nearly 6 months. Back to IM!

## Before Contest

I warmed up by solving [Pinely Round 2](https://codeforces.com/contest/1863).

### A

We compute the optimal scenario and the pessimal scenario: 
Optimal is assuming that when every time someone comes online, the person has yet to read the post. Pessimal is assuming that every time someone comes online, if it is possible, we assume the person has already read the post. 

This should yield a simple $O(n)$ solution. 


### B

We notice that when we choose $x$ and then $y > x$, the part where it is $< x$ does not change at all in the second operation. This observation motivates a greedy solution, where if $i...j$ is already in the right order as a subsequence of the permutation, we we should do an operation with $j$. 

Storing the indices of $1$ to $n$ and scanning in that order should lead to an $O(n)$ solution.

### C

The crucial observation is that we could think of the operation as rotating a $n + 1$ length array, where the initial array is $a_1$, $\dots$, $a_n$, $a_{n + 1}$, and 

$$
a_{n + 1} = \frac{n(n + 1)}{2} - \sum_{i = 1}^n a_i
$$

Then, we only care about $k \pmod{n + 1}$ number of operations, which can be simulated in $O(k)$ using a deque or use the std::rotate() function.

### D

Dominoes that are placed horizontally do not affect the row count, and vice versa, so we can color the vertical dominoes by scanning row by row, making sure that there are only even number of vertical dominoes occupying each row, and similarly with the columns. 

The time complexity is $O(nm)$.

### E

If we know which hour to start, we can greedily complete the quests, completing whichever is completable, but the number of hours is $k \leq 10^9$, so we have to find a smarter approach. We use dynamic programming: $dp[u]$ represents the fastest time that the quests dependent on quest $u$ can be completed, and it satisfies the following recursion:

$$
dp[u] = \max_{v \in N(u)} 
\begin{cases}
    dp[v] & \text{if $h[u] \leq h[v]$} \\
    dp[v] + (1, 0) & \text{if $h[u] > h[v]$} \\
\end{cases}
$$

and then, we add a dummy node that represents the super source with edges from the super source to the sources in the original graph. Using storing a suffix maximum, we can iterate all possible starting time, and choose whichever takes the shortest amount of time. 

The time complexity should be $O(n + m)$.

### F

Let $S = \oplus_{i = L}^R a_i$, $x = \oplus_{i = L}^k a_i$, $y = \oplus_{i = k + 1}^R a_i$, then, $S = x \oplus y$, and there are two cases:

i) $S = 0$

Then, for any $L < k < R$, we can attain $[L, k]$ and $[k + 1, R]$. 

ii) $S > 0$

Then, whichever of $x$ and $y$ that has the MSB of $S$ can be attained. 

We maintain an array $msbs[i]$ which stores the MSB of a "good" array, and another array $is\\_zero[i]$ which is true if there is a "good" array with xor sum zero. 

The time complexity should be $O(n^2)$. 

## [Actual Contest](https://codeforces.com/contest/1909)

### A

The only case that is not achievable is when there exists a point with a positive $x$-value, a point with a positive $y$-value, a point with a negative $x$-value, and a point with a negative $y$-value, where each point does not necessarily have to be different. 

This can be checked in $O(n)$.

### B

Considering the binary representation. Since each $a_i$ is distinct, there exists a position $j$ where not all $a_i$ shares the same value for that position, and we can find the first position where they differ. Then, $2^j$ is the answer.

The time complexity is $O(n\log\text{MAX})$ if done naively, otherwise, $O(n + \log\text{MAX})$ is possible.

### C

Note that if there exists a pair of intervals intersecting, it is always better to make them nested, and there exists only one configuration that satisfies it, which can be found by sorting the $l$ values and the $r$ values.

The time complexity is $O(n\log n)$

### D

Each $a_i$ is independent of each other, so we should focus on a single one. For $a_i$, after performing $m$ of the operation, it is possible to make $m + 1$ copies of $\frac{a_i + km}{m + 1} = k + \frac{a_i - k}{m + 1}$. So we need to make the value of $\frac{a_i - k}{m + 1}$ the same for every $i$. Let $g = \gcd_{i = 1}^n (a_i - k)$, then, $m_i = \frac{a_i - k}{g} - 1$. 

The time complexity is $O(n + \log\text{MAX})$. 

### E

If we simply turn on all the switches, only the perfect squares will remain, so for $n$ that satisfies $\lfloor\sqrt{n}\rfloor \leq \lfloor\frac{n}{5}\rfloor$, which holds true for all $n \geq 20$, we can always satisfy the condition. Now, for $n \leq 19$, we focus on the vectors $v_i \in \mathbb{Z}_2^n$, representing the lights that are turned on by switch $i$, and $v_1$, $\dots$, $v_n$ is the basis, so there are $\binom{n}{1} + \binom{n}{2} + \binom{n}{3} = O(n^3)$ valid combinations of switches. 

Caching the valid combination of switches, we can achieve $O(Tn^4)$.

### F1 & F2

Let $dp[i]$ be the number of valid placements of $1$ to $i$ that satisfies the restrictions $a_1$, $\dots$, $a_i$, and let $c = i - a_i$. Suppose the next position that isn't $-1$ is $j > i$. Then, the recurrence is

$$
dp[j] = dp[i]\sum_{k = 0}^{a_j - a_i}\binom{j - i}{k}\binom{c}{a_j - a_i - k}\binom{j - i}{a_j - a_i - k}(a_i - a_j - k)!\binom{j - a_j + k}{k}k!
$$

Since $a_i$ must be an increasing sequence (excluding $-1$s) for the restriction to have a valid permutation, the time complexity is $O(n)$. 


## Afterthought 

The quality of each problem was amazing. I hope the following Div 1+2 rounds also have this high-quality problems. 