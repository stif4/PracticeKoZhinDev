import React from 'react';
import IndexPage from '../../routes/IndexPage';

import './Layout.scss';

//оболочка для всех страниц, для примера подставлен IndexPage
export default function Layout() {
    return (
        <div className='Layout'>
            <IndexPage />
        </div>
    );
}
