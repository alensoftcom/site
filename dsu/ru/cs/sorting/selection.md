---
title: Сортировка выбором
weight: 2
published: true
---

Похожим методом является **сортировка выбором** (минимума или максимума).

Чтобы отсортировать массив, $n$ раз выберем минимум среди еще неотсортированных чисел и поставим его на свое место (а именно, на $k$-тую позицию после $k$-той итерации). Чтобы упростить реализацию, на $k$-ой итерации будем искать минимум на отрезке $[k, n - 1]$, меняя его местами с текущим $k$-тым элементом, после чего отрезок $[0, k]$ будет отсортирован.

```cpp
void selection_sort(int *a, int n) {
    for (int k = 0; k < n - 1; k++)
        for (int j = k + 1; j < n; j++)
            if (a[k] > a[j])
                swap(a[j], a[k]);
}
```

Доказательства корректности и времени работы аналогичны [пузырьковой сортировке](../bubble): после каждой из $O(n)$ итераций мы за время $O(n)$ получаем отсортированный префикс (первые $k$ элементов), а значит за $O(n^2)$ операций отсортируем весь массив целиком.