import React from "react";

export const Table = ({ list }) => (
  <table className="table">
    <thead>
      <tr>
        <td>Link</td>
        <td>Author</td>
        <td>Comments</td>
        <td>Points</td>
      </tr>
   </thead>
   <tbody>
   {list.map(item => (
      <tr key={item.objectID} className="table-row">
        <td>
          {item.url ? <a href={item.url}>{item.title}</a> : <i>Link not found</i>}
          
        </td>
        <td>{item.author}</td>
        <td>{item.num_comments}</td>
        <td>{item.points}</td>
      </tr>
   ))}
   </tbody>
  </table>
);
