---
title: «Деление» по модулю
weight: 3
prerequisites:
- /cs/algebra/binpow
- extended-euclid
---

Часто в олимпиадных задачах требуется посчитать какие-то большие комбинаторные величины по простому модулю (чаще всего $10^9 + 7$). Это делают для того, чтобы участникам не приходилось использовать длинную арифметику, и они могли сосредоточиться на самой задаче.

Обычные арифметические операции по модулю выполняются не сильно сложнее — просто нужно брать модули и заботиться о переполнении. Например:

```cpp
c = (a + b) % mod;
c = (a - b + mod) % mod;
c = a * b % mod;
```

Но вот с делением возникают проблемы — мы не можем просто взять и поделить.

Например, $\frac{8}{2} = 4$, но

$$
\frac{8 \bmod 5}{2 \bmod 5} = \frac{3}{2} \neq 4
$$

Нужно найти некоторый элемент, который будет себя вести как $\frac{1}{a} = a^{-1}$, и вместо «деления» домножать на него. Такой элемент называется *обратным* по модулю $m$. Для $a = 0$ обратный по модулю элемент не определён, как и при обычном делении.

## Через бинарное возведение в степень

Малая теорема Ферма говорит, что для любого простого числа $p$ и любого целого числа $a$,

$$
a^p \equiv a \pmod p
$$

Теперь два раза «поделим» этот известный результат на $a$:

$$
a^p \equiv a \implies a^{p-1} \equiv 1 \implies a^{p-2} \equiv a^{-1}
$$

Получается, что $a^{p-2}$ ведет себя как $a^{-1}$ относительно умножения по модулю, что нам и нужно.

Посчитать $a^{p-2}$ можно за $O(\log p)$ бинарным возведением в степень.

```c++
const int mod = 1e9 + 7;

// бинарное возведение в степень по модулю
int binpow(int a, int n) {
    int res = 1;
    while (n != 0) {
        if (n & 1)
            res = res * a % mod;
        a = a * a % mod;
        n >>= 1;
    }
    return res;
}

// находит обратный элемент как a^(p-2)
int inv(int x) {
    return binpow(x, mod - 2);
}
```

Этот подход простой и быстрый, однако следует помнить, что он работает только для простых модулей.

В случае составных модулей, по теореме Эйлера, число $a$ нужно возводить в степень $(\phi(m)-1)$, для чего нужно искать факторизацию.

## Через расширенный алгоритм Евклида

[Расширенный алгоритм Евклида](../extended-euclid) можно использовать для решения в целых числах уравнений вида

$$ Ax + By = 1 $$

Подставим в качестве $A$ и $B$ соответственно $a$ и $m$:

$$ ax + my = 1 $$

Одним из решений уравнения и будет $a^{-1}$, потому что если взять уравнение по модулю $m$, то получим

$$ ax + my = 1 \iff ax \equiv 1 \iff x \equiv a^{-1} \pmod m $$

Преимущества этого метода над возведением в степень:

- Если обратное существует, то оно найдется даже если модуль не простой.
- Алгоритм проще выполнять руками.
- Алгоритм чуть быстрее, если его соптимизировать

Но лично автор почти всегда использует возведение в степень.

### Упрощенная реализация

Сначала приведем реализацию, а потом поймем, почему она работает:

```cpp
int inv(int a, int m) {
    if (a == 1)
        return 1;
    return (1 - 1ll * inv(m % a, a) * m) / a + m;
}
```

Докажем по индукции, что функция действительно возвращает обратный элемент.

Базовый случай очевиден: $1 \cdot 1 \equiv 1$.

Во втором случае проверим правильность формулы:

- $(1 - f(m \bmod a, a) \cdot m)$ делится на $a$, так как $f(m \bmod a, a) \equiv m^{-1} \pmod a$.
- $\frac{f(m \bmod a, a) \cdot m}{a}$ делится на $m$, так что итоговое выражение сравнимо с $\frac{1}{a} = a^{-1}$ по модулю $m$.

Почему ответ будет получаться в диапазоне от $0$ до $(m - 1)$, мы оставим читателю в качестве упражнения.

## Предподсчет обратных элементов

Чаще всего нам нужно искать обратный элемент в контексте комбинаторики.

Например, особенно часто нужно считать биномиальные коэффициенты, для чего в свою очередь нужно уметь обращать факториалы:

$$
C_n^k = \frac{n!}{(n-k)! k!}
$$

Простой способ — это предпосчитать обычные факториалы и каждый раз вызывать `inv` один или два раза:

```c++
int t[maxn]; // факториалы, можно предподсчитать простым циклом

int c(int n, int k) {
    return t[n] * inv(t[k]) % mod * inv(t[n - k]) % mod;
}

// или, почти в два раза быстрее:
int c(int n, int k) {
    return t[n] * inv(t[k] * t[n - k] % mod) % mod;
}
```

Однако это добавит лишний логарифм в асимптотику в нередком случае, когда какая-то комбинаторная формула лежит внутри горячего цикла. Поэтому имеет смысл предподсчитать и частые обратные элементы.

### Обратные факториалы

Если у нас уже написан `inv`, то нам не жалко потратить лишние $O(\log m)$ операций, посчитав $(a!)^{-1}$.

После этого обратный к $(a-1)!$ можно посчитать за $O(1)$ по формуле:

$$
(a-1)!^{-1}
=
(a!)^{-1} \cdot a
\equiv
\frac{1}{1 \cdot 2 \cdot \ldots \cdot (a-1)}
\pmod p
$$

Все остальные обратные факториалы можно таким же образом итеративно подсчитать из предыдущего.

```c++
// обычные факториалы:
int f[maxn];

f[0] = 1;
for (int i = 1; i < maxn; i++)
    f[i] = i * f[i - 1] % mod;

// обратные факториалы:
int r[maxn];

r[maxn - 1] = inv(f[maxn - 1])
for (int i = maxn - 1; i >= 1; i--)
    r[i-1] = r[i] * i % mod;
```

Также существует [метод](http://e-maxx.ru/algo/reverse_element) нахождения обратных для всех чисел от $1$ до $(p - 1)$, но так как обычно модули большие, он не часто применим.

## Почему $10^9+7$?

Несколько причин:

1. Это выражение довольно легко вбивать (`1e9+7`).
2. Простое число.
3. Достаточно большое.
4. `int` не переполняется при сложении.
5. `long long` не переполняется при умножении.

Кстати, $10^9 + 9$ обладает всеми теми же свойствами. Иногда используют и его.

Иногда можно встретить $998244353$. Оно обладает всеми свойствами кроме первого, но зато имеет применение в одном из вариантов [быстрого преобразования Фурье](/cs/algebra/fft). Его иногда добавляют даже в задачи, которые к нему не относятся, чтобы не раскрывать участникам тему.