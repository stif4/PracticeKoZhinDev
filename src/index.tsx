import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import Application from './Application';
import {store} from './store/store';

//1) зарефакторить компоненты, button и прочие сделать как в inputmultiselect, разбить все по папкам.
//2) зарефакторить api, обработка ошибок все в классы.
//3) переделать компоненты form, использотвать react hook forms
//4) адаптировать
//5) написать тесты
//6) подебажить запросы и ререндаренги, подумать как можно оптимизировать.

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Application />
        </Provider>
    </React.StrictMode>,
);
