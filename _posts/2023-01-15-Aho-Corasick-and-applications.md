---
layout: post
title: Aho-Corasick and Applications
description: AC Automaton
tags: [string]
usemathjax: true
---

_Prerequisites:_ Aho-Corasick

_Problems_

[CodeForces Edu Round 94 F](https://codeforces.com/problemset/problem/1400/F)

<details markdown="1">

<summary> Solution </summary>

Bruteforce + Aho-Corasick + DP

Note that the maximum number of x-prime strings for $x \leq 20$ is $2399$ and the size of the
automaton created by those strings is at most $5000$. If we let $m$ to be the size of the AC
Automaton, we can get a simple $\mathcal{O}(|S|m)$ DP where a dp state $dp\_{i, j}$ stores the
minimum number of characters removed in the prefix $S[1\dots i]$, such that we have the resulting
string ending up at vertex $j$ in the AC Automaton.

</details>
