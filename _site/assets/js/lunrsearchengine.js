
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/math-cs-blog/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/math-cs-blog/about",
    "title": "About Me",
    "body": "Hello! Welcome to my blog. I am Youngmin Park, a first-year computer science major, double majoring with mathematics,at University of California, Berkeley. I usually go by the username Bungmint on many websites. This blogis a project of mine to jot down notes about anything mathematics/CS related (mainly about competitive programming);Here are some of my profiles on comeptitive programming websites:  Codeforces Atcoder dmojThis blog idea is deeply inspired by smax’s blog, so check his blog out, too!Also, this website is powered by Jekyll and uses the “Mediumish” theme. "
    }, {
    "id": 2,
    "url": "http://localhost:4000/math-cs-blog/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "http://localhost:4000/math-cs-blog/",
    "title": "Home",
    "body": "   Featured:                                                                           First Post               :                Hello! I am Youngmin Park, a first-year math &amp; compsci major at UC Berkeley. I decided to make a blog to become a more organized. . .        :                                     05 Jan 2023        &lt;/span&gt;                                                             All Posts:                                                     First Post              :       Hello! I am Youngmin Park, a first-year math &amp; compsci major at UC Berkeley. I decided to make a blog to become a more organized person as my notes have. . . :                               05 Jan 2023        &lt;/span&gt;                                                                             January Problem-solving (1)              :       ARC 88E Papple Sort:                               05 Jan 2023        &lt;/span&gt;                                   "
    }, {
    "id": 4,
    "url": "http://localhost:4000/math-cs-blog/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 5,
    "url": "http://localhost:4000/math-cs-blog/first-post/",
    "title": "First Post",
    "body": "2023/01/05 - Hello! I am Youngmin Park, a first-year math &amp; compsci major at UC Berkeley. I decided to make a blog to becomea more organized person as my notes have been everywhere, very disorganized. Hopefully, this would change. Anyways, I will probably write things related to my studies, and competitive programming stuff. "
    }, {
    "id": 6,
    "url": "http://localhost:4000/math-cs-blog/January-problems-1/",
    "title": "January Problem-solving (1)",
    "body": "2023/01/05 - ARC 88E Papple Sort  Solution Without loss of generality, let the length of the string be even. Consider for each character $c$, the set $S_c = \{i | s_i = c\}$. In the resulting palindrome, each index in $S_c$ is pairedwith another index in $S_c$. Since it is unideal to swap between two adjacent characters that are the same, the ordering of the indicesin $S_c$ does not change. Hence, The smallest index gets paired with the largest index, and so on. Now, we can transform the given problem into the following problem:  We have $k$ pairs with distinct left and right indices. We assign $0\sim k-1$ for each pair. If a pair getsassigned $i$, then $a_l = i, a_r = 2k - i$ for the array $a$ of size $2k$. What is the minimum number of inversion of $a$?  Thinking of the pairs as intervals, it should be clear that for nested pairs, the inversion count is either 0 or 2,non-nested, intersecting pairs always have an inversion count of 1, and non-intersecting pairs always have an inversion count of 2. Hence, we have to minimize the inversion count for every nested pairs.    Lemma. It is possible to obtain an inversion count of 0 for each nested pair.   Proof. Think of the pairs as vertices, and whenever a pair is nested in another pair, add a directed edge to it. Clearly,this digraph is acylic, so if we label the pairs accordingly to the topological sort, we can achieve the inversion count of 0.   So, the problem is reduced down to calculating the total number of intersecting pairs, and non-intersecting pairs whichcan be solved using a BIT/Segment Tree in $\mathcal{O}(N\log N)$.  For odd length strings, we can manually add the inversion count of the one character by iterating over the pairs. CodeForces Round #473 Div 2F  Solution  Offline query, XOR Basis, and the Fundamental Theorem of Linear Algebra solves the problem(Technically, we could store the basis of each prefix since $|B|\leq 20$ as $a_i &lt; 2^{20}$, and $N \leq 10^5$,so we could solve the queries online). We could think of the 20-bit integers as vectors in $\mathbb{Z}_2^{20}$, and this allows usto transform the problem into a straightforward linear algebra problem:  Let $T:\mathbb{Z}_2^N\mapsto\mathbb{Z}_2^{20}$, $T(v_1, v_2, \ldots, v_N) = \oplus_{i = 1}^N v_ia_i. $Calculate the number of vector $u$, such that $Tu = x$.  Clearly, if $x$ is not in the span of the basis of $a_1, a_2, \ldots, a_N$, $B$, the answer is zero. Now, suppose $Tu = x$. Then, if $Tv = x \implies T(u - v) = 0$, hence, the answer is the number ofvectors in the null space of $T$. By the Fundamental Theorem of Linear Algebra, $\dim\operatorname{Null}(T) = \dim V - \dim\operatorname{range}(T) = N - |B|$, hence, $|\operatorname{Null}(T)| = 2^{N - |B|}$.  Calculating the basis of the prefix of $a$ can be done incrementally in $\mathcal{O}(\log\max a_i)$ andchecking if $x$ is in the basis can be done in a similar fashion, which yields a $\mathcal{O}((N+Q)\log\max a_i)$solution. BOJ 14859 Three-way Coprime  Description (for those who can't read Korean)  Given a sequence of length $N, N \leq 10^5, a_1, a_2, \ldots, a_N$, $1 \leq a_i \leq 10^6$,count all triplets $(i, j, k), 1 \leq i &lt; j &lt; k \leq N$ that satisfies $\gcd(a_i, a_j, a_k) = 1$.   Solution  Typical number theory approach where we iterate over the multiples of an integer.  Let freq be the frequency array, where freq[i] stores $\vert\{j : i \vert a_j \}\vert$, and cnt[d] bethe number of triplets $(i, j, k)$, such that $\gcd(a_i, a_j, a_k) = d$. Clearly, answer is cnt[1]. \[cnt[d] = \binom{freq[i]}{3} - \sum_{j = 2}^{\left\lfloor\frac{\max a_i}{d}\right\rfloor} cnt[jd]\]POI 2005 Template  Solution  KMP + A bit of observations  Possible templates of $S$ are itself and the templates of $S[0:\pi[|S| - 1] - 1]$. Note that if $\pi[|S| - 1] &gt;= \frac{|S|}{2}$, then $S[0:\pi[|S| - 1] - 1]$ is indeed a template. So we only have to check when the value of the prefix function halves or more. It is clear thatthis can only happen $\mathcal{O}(\log |S|)$ times, so even with a naive $\mathcal{O}(|S|)$ checking,we get a $\mathcal{O}(|S|\log |S|)$ solution. CodeForces Edu Round 137F  Solution  Contribution technique + Segment Tree storing matrices.  It is easy to see that we could count the contribution of each integer in $0\dots 3\times 10^5$. For each integer, we could consider a dp, and the transition can be modelled using $2\times 2$matrices, suggesting we should use a segment tree. Also, transitioning from $i$ to $i + 1$ can beeasily done by storing the indices of segments that have the left boundary as $i + 1$ or right boundaryas $i$. This allows a $\mathcal{O}((N + MAX)\log N)$ with a constant factor of 8 for matrix multiplication. "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});