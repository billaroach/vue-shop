<template>
  <div class="v-about">
    <div class="v-about-container">
      <h2 class="v-about__header">Приветствую вас в магазине подержаных электронных товаров!</h2>
      <p class="v-about__text">
        Здесь вы можете приобрести товары таких категорий, как:
        <ul>
          <li>
            Смартфоны;
          </li>
          <li>
            Собранные персональные компьютеры;
          </li>
          <li>
            Ноутбуки;
          </li>
          <li>
            Кнопочные мобильные телефоны.
          </li>
        </ul>
      </p>
      <p class="v-about__text">
        Интернет-магазин создан на основе стека технологий Vue.js и Cloud Firestore.
        Проект создан весной 2021 года в рамках практического задания дипломной работы.
        Функции веб-приложения:
      <ul>
        <li>
          Регистрация пользователя;
        </li>
        <li>
          Авторизация пользователя;
        </li>
        <li>
          Выбор товаров по цене и категории;
        </li>
        <li>
          Добавление товара в корзину и выбор числа покупаемых единиц;
        </li>
        <li>
          Возможность оплаты с помощью платежной системы PayPal;
        </li>
        <li>
          Для администратора имеется функция управления базой данных: доступно добавление, удаление, изменение товара;
        </li>
        <li>
          Возможность залогиненному пользователю просмотреть свой последний заказ в личном кабинете;
        </li>
      </ul>
      </p>
    </div>
  </div>
</template>

<script>
export default {
name: "About"
}
</script>

<style scoped>
  .v-about-container {
    margin-top: 100px;
  }
  .v-about-container {
    border-radius: 15px;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 25px;
  }

  .v-about__header {
    text-align: center;
  }
  .v-about__text {
    text-align: center;
  }
</style>