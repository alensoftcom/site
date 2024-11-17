---
title: Персистентное дерево отрезков
weight: 4
authors:
- Сергей Слотин
prerequisites:
- path-copying
- /cs/segment-tree/pointers
date: 2021-09-13
---

Общий подход к персистентности почти любой ссылочной структуры — это создавать копии всех вершин, в которых хоть что-то меняется, и менять это что-то в копиях, никогда не изменяя уже существующие вершины.

Персистентное дерево отрезков здесь не исключение. Просто будем при спуске создавать копию вершины перед тем, как что-либо менять в ней самой или её потомках. Асимптотика операций от этого не изменится, разве что общее потребление памяти увеличится до $O(m \log n)$.

Удобнее всего по аналогии с `push` в отложенных операциях определить функцию `copy`, копирующую детей текущей вершины, и просто без разбору вызывать её во всех вершинах, в которых что-то может измениться.

```cpp
struct Segtree {
    int lb, rb;
    int s = 0;
    Segtree *l = 0, *r = 0;
    Segtree(int lb, int rb) : lb(lb), rb(rb) {
        if (lb != rb) {
            int t = (lb + rb) / 2;
            l = new Segtree(lb, t);
            r = new Segtree(t, rb);
        }
    }
    void copy() {
        if (l) {
            l = new Segtree(*l);
            r = new Segtree(*r);
        }
    }
    void add(int k, int x) {
        copy();
        s += x;
        if (l) {
            if (k < l->rb)
                l->add(k, x);
            else
                r->add(k, x);
        }
    }
    int sum(int lq, int rq) {
        // этот метод ничего не меняет -- он и так хороший
        if (lq <= lb && rb <= rq)
            return s;
        if (max(lb, lq) >= min(rb, rq))
            return 0;
        return l->sum(lq, rq) + r->sum(lq, rq);
    }
};
```

Теперь осталось только создать список версий, и после каждой операции копировать туда новый корень:

```cpp
vector<Segtree*> roots;

roots.push_back(new Segtree(0, n));

void add(int k, int x, int v) {
    Segtree *root = new Segtree(*roots[v]);
    root->add(k, x);
    roots.push_back(root);
}
```

В качестве альтернативного подхода можно копировать не детей, а текущую вершину, и возвращать её из рекурсии и переподвешивать за родителя. Это вычислительно эффективнее, но нужно сильно изменить реализацию.

## Применения

В контексте задач на структуры данных персистентное дерево отрезков особенно часто применяют в задачах, где применили бы метод сканирующей прямой, если бы запросы были известны заранее.

### Сумма на прямоугольнике

**Задача.** Даны $n$ точек на плоскости. Нужно *в онлайн* ответить на $q$ запросов числа точек на прямоугольнике.

Если бы можно было отвечать в оффлайн, мы бы разбили запрос на два запроса на префиксах и прошлись бы сканлайном слева направо, добавляя $y$-координаты точек в дерево отрезков и отвечая на запросы суммы на подотрезках — но так делать мы не можем.

Но *точки* в оффлайн известны. Добавим их в таком же порядке в *персистентное* дерево отрезков, а не обычное, и сохраним корни деревьев с разными $x$-координатами в порядке увеличения.

Теперь мы можем ответить на запрос, так же декомпозировав его на два и перенаправив их в две разные версии дерева отрезков, соответствующие большей и меньшей $x$-координатам. Таким образом, можно отвечать на запросы в онлайн за $O(q \log n)$ времени и памяти.

### Порядковые статистики

**Задача.** Дан отрезок из $n$ целых чисел и $q$ запросов $k$-той порядковой статистики на подотрезке.

Во-первых, сожмем все числа, чтобы они были от 1 до $n$.

Затем, пройдёмся с персистентным деревом отрезков для суммы по массиву слева направо, и когда будем обрабатывать элемент $a_k$, добавим единицу к $a_k$-ому элементу в дереве отрезков. Заметим, что сумма с $l$ по $r$ в таком дереве будет равна количеству элементов между $l$ и $r$ на текущем префиксе.

Дальше определим *разность деревьев* как дерево отрезков, которое получилось бы, если бы оно было построено поверх разности соответствующих массивов.

Что будет находиться в разности $r$-го и $l$-го дерева ($r > l$)? Там будут находиться количества вхождений чисел на отрезке массива с $l$ по $r$ — какой-то массив целых неотрицательных чисел. Если в таком разностном дереве сделать спуск, который находит последнюю позицию, у которой сумма на префиксе не превышает $k$ — она и будет ответом на запрос.

Если не обязательно строить разностное дерево явно, чтобы делать по нему спуск — можно просто спускаться одновременно в двух деревьях и везде вместо суммы $s$ использовать $(s_r - s_l)$:

```cpp
int kth(Segtree *l, Segtree *r, int k) {
    if (k == 0)
        return l->lb;
    int s = r->l->s - l->l->s;
    if (s <= k)
        return kth(l->l, r->l, k);
    else
        return kth(l->r, r->l, k - s);
}
```

Отметим, что эту и предыдущую задачу также можно решить через mergesort tree за $O(n \log^2 n)$, а также двумерными структурами за такую же асимптотику.

### Доминирующий элемент

**Задача.** Дан массив из $n$ элементов. Требуется ответить на $m$ запросов, есть ли на отрезке $[l, r)$ *доминирующий* элемент — тот, который встречается на нём хотя бы $\frac{r-l}{2}$ раз.

У этой задачи есть удивительно простое решение — взять около 100 случайных элементов для каждого проверить, является ли он доминирующим. Проверку можно выполнять за $O(\log n)$, посчитав для каждого значения отсортированный список позиций, на которых он встречается, и сделав в нём два бинпоиска. Вероятность ошибки в худшем случае равна $\frac{1}{2^{100}}$, и ей на практике можно пренебречь.

Но проверять 100 сэмплов — долго. Построим такое же дерево отрезков, как в прошлой задаче, и решим задачу «найти число, большее $\frac{n}{2}$ в массиве из $n$ неотрицательных целых чисел с суммой не более $n$» относительно разностного дерева. Это тоже будет спуском по нему: каждый раз идём в того сына, где сумма больше (потому что сын с меньшей суммой точно не доминирующий). Если в листе, куда мы пришли, значение больше нужного, возвращаем `true`, иначе `false`.

**Упражнение.** Придумайте, как модифицировать спуск в [задаче](https://codeforces.com/problemset/problem/840/D?locale=ru) где доминирующим считается элемент, встречающийся хотя бы $\frac{r-l}{k}$ раз для маленького $k$ (от 2 до 5).

### Как персистентный массив

С помощью дерева отрезков обычно и реализуют полностью персистентный массив — в общем случае быстрее $O(\log n)$ на запрос не получается. Персистентный массив в свою очередь можно использовать, чтобы делать персистентными не-ссылочные структуры — например, систему непересекающихся множеств.

В СНМ мы храним всё состояние в массивах, которые можно просто сделать персистентными через дерево отрезков. Асимптотика такой структуры будет $O(n \log n)$ времени и памяти — причем логарифм здесь и от самого СНМа (нужно пройтись по $O(\log n)$ предков — эвристику сжатия путей мы использовать не можем), так и от персистентного ДО (обновить значение какого-то $p_v$ и $s_v$ / $h_v$).