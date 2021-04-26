import React from 'react';

export function DescriptionList(props) {
    const list = props.list;
    const title = props.title;
    const html = list.map(a => (
        <div>
            <div class='row'>
                <div class='d-block'>
                    <div class='float-start mr-auto'>{a.translation}</div>
                    <div class='float-left' dir='ltr'>{title}{a.foreignEquivalents ? ', ' : ''}</div>
                    {a.foreignEquivalents.map((fe, i, arr) => (<div class='float-left' dir='ltr'>{fe}{arr.length - 1 === i ? '' : ', '}</div>))}
                </div>
            </div>
            <div class='row'><p>[{a.scopes.join('، ')}]{a.description}</p></div>
        </div>
    ));
    return (
        <div>
            {html}
        </div>
    );
}