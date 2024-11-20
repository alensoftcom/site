---
title: Матрицы
weight: -9
authors:
- Сергей Слотин
- Максим Иванов
---

**Определение**. Функция $f: \mathbb{R}^n \to \mathbb{R}^m$ называется *линейной*, если для неё выполнено:

1. $f(x+y) = f(x) + f(y)$
2. $f(ax) = a f(x), \; a \in \mathbb{R}$

Например, линейными являются:

* Функция, которая «растягивает» вектор в $k$ раз: $f(x) = k x$.
* Функция, которая поворачивает вектор на плоскости на угол $\theta$.
* Функция, которая проецирует трёхмерный вектор на какую-нибудь плоскость.
* Скалярное произведение $f(x, y) = x \cdot y = \sum x_ky_k$ также линейно по обоим параметрам.

Из одних лишь двух пунктов в определении можно вывести много полезных свойств:

* Сумма линейных функций является линейной функцией.
* Композиция линейных функций $f(g(x)) = (f \circ g)(x)$ является линейной функцией.
* Сумма линейных функций коммутативна: $f+g = g+f$.
* Сумма линейных функций ассоциативна: $(f+g)+h = f+(g+h)$.
* Композиция линейных функций ассоциативна: $(f \circ g) \circ h = f \circ (g \circ h) = f \circ g \circ h$.
* Композиция в общем случае не коммутативна. Пример: $f(x) = (-x_2, x_1)$ — поворот точки на плоскости на прямой угол, $g(x) = (x_1, 0)$ — проекция на $Ox$. Почти для всех точек плоскости важен порядок этих двух операций.

*Линейная алгебра* занимается изучением линейных функций.

## Матрицы

Можно показать, что любую линейную функцию $f: \mathbb{R}^n \to \mathbb{R}^m$ можно представить в следующем виде:

$$
f(x) =
\begin{pmatrix}
    a_{11} \cdot x_1 + a_{12} \cdot x_2 + \ldots + a_{1n} \cdot x_n
\\  a_{21} \cdot x_1 + a_{22} \cdot x_2 + \ldots + a_{2n} \cdot x_n
\\  \ldots
\\  a_{m1} \cdot x_1 + a_{m2} \cdot x_2 + \ldots + a_{mn} \cdot x_n
\end{pmatrix}
$$

*Матрицы* представляют собой просто очень компактную запись этих коэффициентов $a_{ij}$.

$$
A =
\begin{pmatrix}
a_{11} & a_{12} & \ldots & a_{1n} \\
a_{21} & a_{22} & \ldots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \ldots & a_{mn} \\
\end{pmatrix}
$$

Каждой линейной функции $f$ из $\mathbb{R}^n$ в $\mathbb{R}^m$ соответствует какая-то матрица $A$ размера $n \times m$ и наоборот. Число $n$ равно количеству строк, а $m$ — количеству столбцов. Элемент на пересечении $i$-ой строки и $j$-го столбца будем обозначать $A_{ij}$. Не перепутайте.

### Связь с векторами

Если вектор — это упорядоченный набор скаляров, то матрицу можно рассматривать как вектор векторов. Вектор, в частности, можно представить как матрицу, у которой одна из размерностей равна единице — тогда его называют *вектор-столбец* либо *вектор-строка*.

```c++
typedef vector<vector<int>> matrix;
```

Ещё есть *тензоры* — ими называют все объекты ещё более высокого порядка: векторы матриц (трёхмерный тензор), матрицы матриц (четырёхмерный тензор) и векторы матриц матриц и так далее.

![](../img/dogs.jpg)

У тензоров есть своя интересная алгебра, но в контекстах, в которых с ними сталкивается обычный программист, никакая алгебра, как правило, не подразумевается, и этот термин используется лишь потому, что в словосочетании «многомерный массив» слишком много букв.

### Матричное умножение

Пусть линейной функции $f$ соответствует матрица $A$, а функции $g$ соответствует матрица $B$. Тогда композиции этих функций $h = f \circ g$ будет соответствовать *произведение* $C$ матриц $A$ и $B$, определяемое следующим образом:

$$
C = AB: \; C_{ij} = \sum_{i=1}^{k} A_{ik} B_{kj}
$$

Читатель может убедиться в этом, аккуратно расписав подстановку формул для $f$ на вход $g$.

При перемножении матриц руками удобно думать так: элемент на пересечении $i$-го столбца и $j$-той строки — это скалярное произведение $i$-той строки $A$ и $j$-того столбца $B$. Заметим, что это накладывает ограничение на размерности перемножаемых матриц: если первая матрица имеет размер $n \times k$, то вторая должна иметь размер $k \times m$, то есть «средние» размерности должны совпадать.

![](../img/matmul.png)

Исходное выражение для $f(x)$ теперь можно компактно записать как $f(x) = Ax$ вместо $m$ уравнений с $n$ слагаемыми в каждом.

Напишем функцию, реализующую матричное умножение:

```c++
const int n, k, m;

matrix matmul(matrix a, matrix b) {
    matrix c(n, vector<int>(m, 0));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            for (int t = 0; t < k; t++)
                c[i][j] += a[i][t] * b[t][j];
    return c;
}
```

Такая реализация хоть и наиболее простая, но не оптимальная: мы на каждой итерации двигаем указатель для $B$ на $m$ шагов вперёд, что приводит к лишним загрузкам кэш-линий и не позволяет компилятору применить [автовекторизацию](/cs/arithmetic/simd). Однако это легко исправить, если перед всеми циклами *транспонировать* $B$, то есть поменять каждый её $(i, j)$-тый элемент на $(j, i)$-тый — такая реализация будет работать в 5-10 раз быстрее.

Существуют способы соптимизировать матричное умножение и сильно дальше — в 50-100 раз по сравнению с наивным — но они выходят далеко за рамки этой статьи. Также наука знает способы способы перемножать матрицы [асимптотически быстрее](https://en.wikipedia.org/wiki/Strassen_algorithm) чем $O(n^3)$, но на практике они становятся эффективными только на матрицах от нескольких тысяч элементов.

### Свойства матриц

К матрицам не нужно относиться как к табличкам, в которых стоят какие-то числа. Каждой матрице соответствует какая-то линейная функция, как-то преобразующая вектора. Центральными объектами линейной алгебры являются именно линейные функции, а не матрицы.

Благодаря этому взаимно однозначному соотношению все ранее упомянутые свойства линейных функций переносятся и на матрицы:

* Сумма матриц $A$ и $B$ тоже является матрицей: $C = A+B: C_{ij} = A_{ij} + B_{ij}$.
* Сумма матриц коммутативна: $A+B = B+A$.
* Сумма матриц ассоциативна: $(A+B)+C = A+(B+C)$.
* Умножение матриц ассоциативно: $(AB)C = A(BC) = ABC$.
* Умножение матриц в общем случае не коммутативно.

Матрицы не обязательно рассматривать только для действительных чисел — все эти свойства переносятся на произвольные *поля*: множества, для которых определены $*$ и $+$ с определенными ограничениями на операции.

Самый популярный класс таких полей — остатки по простому модулю. В частном случае, когда $p = 2$, в поле будет всего два элемента — ноль и единица — а также `xor` в качестве сложения и `and` в качестве умножения. Это позволяет эффективно хранить матрицы в виде [битовых последовательностей](/cs/set-structures/bitset).

### Примеры матриц

Матрица «увеличь всё в два раза»:

$$
\begin{pmatrix}
2 & 0 & 0 \\
0 & 2 & 0 \\
0 & 0 & 2 \\
\end{pmatrix}
$$

Матрица «поменяй $x$ и $y$ местами»:

$$
\begin{pmatrix}
0 & 1 \\
1 & 0 \\
\end{pmatrix}
$$

Матрица поворота на угол $\alpha$ на плоскости:

$$
\begin{pmatrix}
\cos \alpha & -\sin \alpha \\
\sin \alpha & \cos \alpha \\
\end{pmatrix}
$$

Матрица проецирования на плоскость $xy$ в трёхмерном пространстве:

$$
\begin{pmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 0 \\
\end{pmatrix}
$$

Матрица «ничего не делай», также известная как *единичная матрица*:

$$
I_3 = \begin{pmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1 \\
\end{pmatrix}
$$

Единичную матрицу обычно обозначают как $I$ или $E$. На её *главной диагонали* всегда единицы, а вне — нули.