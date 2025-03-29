import React from "react";

function Table({columns, data, renderRow}: {
    columns: { header: string, accessor: string, className?: string }[];
    data: any;
    renderRow: (item: any) => React.ReactNode;
}) {
    return (
        <table className={'w-full mt-4'}>
            <thead>
            <tr className={'text-left text-gray-500 text-sm'}>
                {columns.map(({header, accessor, className}) => (
                    <th key={header} className={className}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item: any) => (
                renderRow(item)
            ))}
            </tbody>
        </table>
    );
}

export default Table;
