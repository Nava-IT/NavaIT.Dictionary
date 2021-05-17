import React from 'react';

export function DescriptionList(props) {
    const list = props.list;
    const title = props.title;
    const tophtml = list.filter(i => !i.referenceWorksheetName).map(a => (
        <div>
            <div class='row'>
                <div class='d-block'>
                    <div class='float-start mr-auto'>{a.translation}</div>
                    <div class='float-left' dir='ltr'>{title}{a.foreignEquivalents && a.foreignEquivalents.length > 0 ? ', ' : ''}</div>
                    {a.foreignEquivalents.map((fe, i, arr) => (<div class='float-left' dir='ltr'>{fe}{arr.length - 1 === i ? '' : ', '}</div>))}
                </div>
            </div>
            <div class='row'><p>[{a.scopes.map(sc => {
                return (
                    <a href={'/scope/' + sc}>{sc}</a>
                );
            }).reduce((prev, curr) => [prev, ', ', curr])}]{a.description}</p></div>
        </div>
    ));
    const refhtml = list.filter(i => i.referenceWorksheetName).map(a => (
        <div>
            <div class='row'>
                <div class='d-block'>
                    <div class='float-left' dir='ltr'>&rarr;{<a href={'/dictionary/' + a.referenceWorksheetName}>{a.referenceWorksheetName}</a>}
                        [{a.scopes.map(sc => {
                        return (
                            <a href={'/scope/' + sc}>{sc}</a>
                        );
                    }).reduce((prev, curr) => [prev, ', ', curr])}{a.description}]
                    </div>
                </div>
            </div>
        </div>
    ));
    return (
        <div>
            {tophtml}
            {refhtml}
        </div>
    );
}