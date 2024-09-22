export default function Pagination({ data = [], pageSize, handlePageChange }) {
  const pageNumber = data.length / pageSize + 1;

  // TODO: To be done
  const numberComponent = () => {
    const elements = [];
    for (let i = 1; i <= pageNumber; i++) {
      elements.push(
        <div
          style={{
            padding: '4px',
            textAlign: 'center',
            width: '20px',
            height: '20px',
            background: '#c7c7c7',
            border: '1px solid #29282a',
            cursor: 'pointer',
          }}
          key={i}
          id={i}
        >
          {i}
        </div>,
      );
    }
    console.log(elements);
    return elements;
  };

  return (
    <div className="pagination" style={{ display: 'flex' }}>
      {numberComponent()}
    </div>
  );
}
