// 引入Redux库
import { createStore } from 'redux';

// 定义初始状态
const initialState = {
  countries: [],
  population: 0,
};

// 定义reducer函数
const worldReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COUNTRY':
      return {
        ...state,
        countries: [...state.countries, action.payload],
      };
    case 'UPDATE_POPULATION':
      return {
        ...state,
        population: action.payload,
      };
    default:
      return state;
  }
};

// 创建store
const store = createStore(worldReducer);

// 打印初始状态
console.log('初始状态:', store.getState());

// 定义action creators
const addCountry = (country) => ({
  type: 'ADD_COUNTRY',
  payload: country,
});

const updatePopulation = (population) => ({
  type: 'UPDATE_POPULATION',
  payload: population,
});

// 分发action
store.dispatch(addCountry('China'));
store.dispatch(addCountry('USA'));
store.dispatch(updatePopulation(1000000000));

// 打印更新后的状态
console.log('更新后的状态:', store.getState());
