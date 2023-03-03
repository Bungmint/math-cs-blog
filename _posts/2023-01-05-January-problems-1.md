---
layout: post
title: January Problem-solving (1)
description: Interesting problems from January
tags: [problem-solving]
usemathjax: true
---

[ARC 88E Papple Sort](https://atcoder.jp/contests/arc088/tasks/arc088_c)

<details markdown="1" style="margin-bottom: 5%">

<summary>Solution</summary>

Without loss of generality, let the length of the string be even.
Consider for each character $c$, the set $S_c = \\{i | s_i = c\\}$. In the resulting palindrome, each index in $S_c$ is paired
with another index in $S_c$. Since it is unideal to swap between two adjacent characters that are the same, the ordering of the indices
in $S_c$ does not change. Hence, The smallest index gets paired with the largest index, and so on.
Now, we can transform the given problem into the following problem: <br>

We have $k$ pairs with distinct left and right indices. We assign $0\sim k-1$ for each pair. If a pair gets
assigned $i$, then $a_l = i, a_r = 2k - i$ for the array $a$ of size $2k$. What is the minimum number of inversion of $a$?

Thinking of the pairs as intervals, it should be clear that for nested pairs, the inversion count is either 0 or 2,
non-nested, intersecting pairs always have an inversion count of 1, and non-intersecting pairs always have an inversion count of 2.
Hence, we have to minimize the inversion count for every nested pairs.

- **Lemma.** It is possible to obtain an inversion count of 0 for each nested pair.
- **Proof.** Think of the pairs as vertices, and whenever a pair is nested in another pair, add a directed edge to it. Clearly,
  this digraph is acylic, so if we label the pairs accordingly to the topological sort, we can achieve the inversion count of 0.

So, the problem is reduced down to calculating the total number of intersecting pairs, and non-intersecting pairs which
can be solved using a BIT/Segment Tree in $\mathcal{O}(N\log N)$.

For odd length strings, we can manually add the inversion count of the one character by iterating over the pairs.

</details>

[CodeForces Round #473 Div 2F](https://codeforces.com/contest/959/problem/F)

<details markdown="1" style="margin-bottom: 5%">

<summary> Solution </summary>

Offline query, XOR Basis, and the Fundamental Theorem of Linear Algebra solves the problem
(Technically, we could store the basis of each prefix since $|B|\leq 20$ as $a_i < 2^{20}$, and $N \leq 10^5$,
so we could solve the queries online).
We could think of the 20-bit integers as vectors in $\mathbb{Z}_2^{20}$, and this allows us
to transform the problem into a straightforward linear algebra problem:

Let $T:\mathbb{Z}\_2^N\mapsto\mathbb{Z}\_2^{20}$, $T(v\_1, v\_2, \ldots, v\_N) = \oplus\_{i = 1}^N v\_ia\_i.$
Calculate the number of vector $u$, such that $Tu = x$.

Clearly, if $x$ is not in the span of the basis of $a_1, a_2, \ldots, a_N$, $B$, the answer is zero.
Now, suppose $Tu = x$. Then, if $Tv = x \implies T(u - v) = 0$, hence, the answer is the number of
vectors in the null space of $T$. By the Fundamental Theorem of Linear Algebra, $\dim\operatorname{Null}(T) = 
\dim V - \dim\operatorname{range}(T) = N - |B|$, hence, $|\operatorname{Null}(T)| = 2^{N - |B|}$.

Calculating the basis of the prefix of $a$ can be done incrementally in $\mathcal{O}(\log\max a_i)$ and
checking if $x$ is in the basis can be done in a similar fashion, which yields a $\mathcal{O}((N+Q)\log\max a_i)$
solution.

</details>

[BOJ 14859 Three-way Coprime](https://www.acmicpc.net/problem/14859)

<details markdown="1" style="margin-bottom: 5%">

<summary> Description (for those who can't read Korean) </summary>

Given a sequence of length $N, N \leq 10^5, a\_1, a\_2, \ldots, a\_N$, $1 \leq a\_i \leq 10^6$,
count all triplets $(i, j, k), 1 \leq i < j < k \leq N$ that satisfies $\gcd(a\_i, a\_j, a\_k) = 1$.

</details>

<details markdown="1" style="margin-bottom: 5%">

<summary> Solution </summary>

Typical number theory approach where we iterate over the multiples of an integer.

Let `freq` be the frequency array, where `freq[i]` stores $\vert\\{j : i \vert a\_j \\}\vert$, and `cnt[d]` be
the number of triplets $(i, j, k)$, such that $\gcd(a\_i, a\_j, a\_k) = d$. Clearly, answer is `cnt[1]`.

$$
cnt[d] = \binom{freq[i]}{3} - \sum_{j = 2}^{\left\lfloor\frac{\max a_i}{d}\right\rfloor} cnt[jd]
$$

</details>

[POI 2005 Template](https://www.acmicpc.net/problem/7966)

<details markdown="1" style="margin-bottom: 5%">

<summary> Solution </summary>

KMP + A bit of observations

Possible templates of $S$ are itself and the templates of $S[0:\pi[|S| - 1] - 1]$.
Note that if $\pi[|S| - 1] >= \frac{|S|}{2}$, then $S[0:\pi[|S| - 1] - 1]$ is indeed a template.
So we only have to check when the value of the prefix function halves or more. It is clear that
this can only happen $\mathcal{O}(\log |S|)$ times, so even with a naive $\mathcal{O}(|S|)$ checking,
we get a $\mathcal{O}(|S|\log |S|)$ solution.

</details>

[CodeForces Edu Round #137 F](https://codeforces.com/contest/1743/problem/F)

<details markdown="1" style="margin-bottom: 5%">

<summary> Solution </summary>

Contribution technique + Segment Tree storing matrices.

It is easy to see that we could count the contribution of each integer in $0\dots 3\times 10^5$.
For each integer, we could consider a dp, and the transition can be modelled using $2\times 2$
matrices, suggesting we should use a segment tree. Also, transitioning from $i$ to $i + 1$ can be
easily done by storing the indices of segments that have the left boundary as $i + 1$ or right boundary
as $i$. This allows a $\mathcal{O}((N + MAX)\log N)$ with a constant factor of 8 for matrix multiplication.

</details>
