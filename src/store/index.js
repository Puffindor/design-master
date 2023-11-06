import { createStore } from "vuex";

function convertCityName(value) {
 return Object.keys(cityId).find((key) => cityId[key] === value);
}

const cityId = {
 Новосибирск: 1,
 Красноярск: 2,
 Бердск: 3,
 Москва: 4,
 "Санкт-Петербург": 5,
 Екатеринбург: 6,
 Казань: 7,
 Калининград: 8,
 Мурманск: 9,
 Пермь: 10,
};
export default createStore({
 state: {
  currnetEditing: null,
  list: [],
 },
 getters: {
  getList(state) {
   return state.list;
  },
  getcurrnetEditing(state) {
   return state.currnetEditing;
  },
 },
 actions: {
  deleteItem(context, payload) {
   context.commit("deleteItem", payload);
  },
  setList(context, payload) {
   context.commit("setList", Object.values(payload));
  },
  createNewItem(context, payload) {
   context.commit("createNewItem", payload);
  },
  setEditItem(context, payload) {
   context.commit("setEditItem", payload);
  },
  saveChanges(context, payload) {
   context.commit("saveChanges", payload);
  },
 },
 mutations: {
  deleteItem(state, payload) {
   state.list = state.list.filter((el) => el.id !== payload);
   localStorage.removeItem(payload);
  },
  setList(state, payload) {
   payload.forEach((el) => {
    try {
     let item = JSON.parse(el);
     item.city = convertCityName(item.city);
     state.list.push(item);
    } catch (e) {
     return;
    }
   });
  },
  createNewItem(state, payload) {
   state.list.push(payload);

   const payload2 = structuredClone(payload);
   payload2.city = cityId[payload2.city];

   localStorage.setItem(payload2.id, JSON.stringify(payload2));
  },
  setEditItem(state, payload) {
   state.currnetEditing = payload;
  },
  saveChanges(state, payload) {
   const payload2 = structuredClone(payload);
   payload2.city = cityId[payload2.city];
   localStorage.setItem(payload2.id, JSON.stringify(payload2));
   state.list.forEach((el) => {
    if (el.id === payload.id) {
     const index = state.list.indexOf(el);
     state.list[index] = payload;
    }
   });
  },
 },
});
