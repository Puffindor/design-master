import { createStore } from "vuex";

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
    state.list.push(JSON.parse(el));
   });
  },
  createNewItem(state, payload) {
   state.list.push(payload);
   localStorage.setItem(payload.id, JSON.stringify(payload));
  },
  setEditItem(state, payload) {
   state.currnetEditing = payload;
  },
  saveChanges(state, payload) {
   localStorage.setItem(payload.id, JSON.stringify(payload));
   state.list.forEach((el) => {
    if (el.id === payload.id) {
     const index = state.list.indexOf(el);
     state.list[index] = payload;
    }
   });
  },
 },
});
