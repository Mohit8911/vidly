import React, { Component } from 'react';

class TableHeader extends Component {

    raiseSort= path =>{
        const sortColumn= {...this.props.sortColumn};
        const order= sortColumn.path===path ? (sortColumn.order==="desc" ? "asc":"desc") : "asc";
        sortColumn.order=order;
        sortColumn.path=path;
        this.props.onSort(sortColumn);
    }
    renderSortIcon= (path) =>{
        const {sortColumn} = this.props;
        if(!path) return null;
        if(sortColumn.path!==path) return null;
        if(sortColumn.order==="desc") return <i className="fa fa-sort-desc" aria-hidden="true"></i>
        return <i className="fa fa-sort-asc" aria-hidden="true"></i>
    }

    render() { 
        return (
            <thead>
                <tr>
                    {this.props.columns.map(column =>(
                    <th className="clickable" key={column.path || column.key} onClick={() => this.raiseSort(column.path)}>{column.label} {this.renderSortIcon(column.path)}</th>
                    ))}
                </tr>
            </thead>
        );
    }
}
 
export default TableHeader;
