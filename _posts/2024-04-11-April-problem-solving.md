---
layout: post
title: April Problem-solving
description: Interesting problems from April
tags: [problem-solving]
usemathjax: true
---


### [JOISC 2018/2019. Cake 3](https://www.acmicpc.net/problem/17677)

First, note that for a fixed set of cakes, it is optimal to place them in an increasing order of the cost to minimize the cost penalty. Then, suppose $f(i, j)$ denote the maximum beauty of the cake given that all the cakes are chosen from $[i, j]$ and the cost incurred is $-2(C_j - C_i)$. Let $opt(i)$ be the optimum maximizing $opt(i, j)$ for $i$. It is easy to prove that $opt(i) \leq opt(i + 1)$. Thus, we can use divide and conquer optimization, and for computing the top $m$ value sum of an interval, we could use persistent segment tree or simply noting that we can use $O(optr - optl + r - l)$ operations when recursing, so we can just use a BIT with ```lower_bound``` and move the left endpoint and right endpoint like how you would do it in Mo's. 

### [CodeForces 1921D. Balanced Subsequences](https://codeforces.com/contest/1924/problem/D)

Relax the condition, and let $f(n, m, k)$ denote the number of bracket sequences such that the longest bracket subsequence is at most of length $2k$, then, the answer we are looking for is $f(n, m, k) - f(n, m, k - 1)$. We find that the recursion is 

$$
f(n, m, k) = \begin{cases}
\binom{n + m}{n} & \text{if $k \geq \min(n, m)$} \\
f(n, m - 1, k) + f(n - 1, m, k - 1) & \text{otherwise} \\
\end{cases}
$$

this leads us to guessing that $f(n, m, k) = \binom{n + m}{k}$ which can be proven from induction.

### [BOJ 1144. 싼 비용](https://www.acmicpc.net/problem/1144)

The main idea is noting that we can use DP on broken profile since we can incrementally add the tiles. However, the state is more involved than a simple bitmask - it needs to convey the information of which tiles are connected, so we need to use 3 bits per position, and then we can do a simple casework for the dp transition. Normalizing the bitmask, such that the first nonzero bit is assigned as 1, and so forth is necessary since it cuts down the number of states drastically, related to the Bell number (number of partition of n distinct objects). This gives an upperbound on the time complexity - $O(nm^2B_m\log B_m)$ which is sufficient.

### [PACNW 2019H. Windmill Pivot](https://www.acmicpc.net/problem/18001)

I was able to get the main idea during the virtual, though I didn't realize the solution I have was sufficient. The key sentence in the question is that after 360 degree rotation, you are guaranteed to have reached back to your original position, which makes implementation easy. Note that there are $O(n^2)$ interesting lines arising from given $n$ points, and for each interesting lines, we can compute the next pivot in $O(n^2\log n)$ by angle sorting, so we have a functional graph with $O(n^2)$ vertices, and we only have to iterate over all the cycles which takes linear time, so in total, the time complexity is $O(n^2\log n)$.

### [PACNW 2023G. Matrix Fraud](https://www.acmicpc.net/problem/31512)

We were not able to make much progress in the actual contest, though Vedant did mention he was able to solve it if $r \geq c$. Note that "column"-banded binary matrix is also "row"-banded binary matrix, so we can transpose to get $r \ge c$. Then, we simply define $f(r, c_l, c_r)$ to be the cost to modify rows $[1, r]$ such that in row $r$, we have ones in the interval $[c_l, c_r]$. The naive transition takes $O(c^2)$, but note that the area querying is a prefix rectangle, so we can make the transition $O(1)$. Hence, the DP takes $O(rc^2) = O(rc\sqrt{rc})$ which is sufficient enough to pass.

### [CodeForces 1672E. notepad.exe](https://codeforces.com/contest/1672/problem/E)

I still cannot believe I didn't solve it back then, but I still struggled to solve this right now lol. We can find $S = \sum_{i} l_i + n - 1$ in less than $30$ queries. Then, we focus on the height $h \in [1, n]$. Clearly, we don't care about width being larger than $\frac{S}{h}$ since we can attain $S$. Also, in the best case scenario where no space is wasted (no trailing spaces in each line), the total characters used is $S - (h - 1)$, so we have a bound on $w$ which is $[(S - (h - 1)) / h, S / h]$. Clearly, this interval always contain at most $1$ integer, so we can simply query the width in the interval for each $h \in [1, n]$ which takes exactly $n$ queries, so we are done.

### [CodeForces 1672F2. Checker for Array Shuffling](https://codeforces.com/contest/1672/problem/F2)

Upsolved, had to read the editorial for the big picture. Considering the directed graph with edges from $a_i$ to $b_i$. 

### [IOI 2013. Cave](https://www.acmicpc.net/problem/20106)

It becomes very trivial after noting that $70000 > N(\log N + 1)$. We iterate over the doors in an increasing order, and I toggled all $\log N$ bits, and then there are two possibilities - the mask or the negation of the mask, and we can check that manually once more. Apparently we could simply do a binary search by toggling all the switches in the range $[l, r]$.

### [CodeForces 1819C. The Fox and the Complete Tree Traversal](https://codeforces.com/contest/1819/problem/C)

The subgraph of the form of one vertex with degree $3$, and each neighbor not being a leaf must not exist in order for the cycle to exist. If no such subgraph exists, then, the graph is of the form of a diameter and some vertices on the diameter having a leaf neighbor not on the diameter. Then, we can simply traverse from left to right, right to left jumping which is easy to prove. 

### [CodeForces 1819D. Misha and Apples](https://codeforces.com/contest/1819/problem/D)

Just maintaining if at position $i$, if the bag can get cleared, and the maximum value achievable afterwards. 

### [CodeForces 1930F. Maximize the Difference](https://codeforces.com/contest/1930/problem/F)

Note that $f(b)$ can be computed by finding the maximum of $b_i \& \~ b_j$. Then, for adding $v$, we add all the possible submasks of $v$ into $S_1$, and $\~v$ into $S_2$ via DFSing. Each submask gets visited at most once and the degree of each mask is $O(\log N)$, so the update takes $O(N\log N)$ and query takes constant time as we can simply check whenever we add a mask to a set, whether the other set already contained the mask. Thus, $O(N\log N + Q)$. 