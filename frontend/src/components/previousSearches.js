

export default function PreviousSearches({ onChange }) {
    const searches = [
        'pizza',
        'burger',
        'cookies',
        'Kekse',
        'juice',
        'saft',
        'sushi',
        'salad',
        'ice cream',
        'eis',
        'lasagna',
        'cake',
        'pudding',
        'soup',
        'suppe',

    ];

    const handleClick = (search) => {
        onChange(search);
    };
    return (
        <div>
            <div className="previous-searches section">
                <h2>Popular Searches</h2>
                <div className="previous-searches-container">
                    {searches.map((search, index) => (
                        <button
                            key={index}
                            style={{ animationDelay: index * 0.1 + "s" }}
                            className="search-item btnsm"
                            onClick={() => handleClick(search)} // Hier wird der Klick-Handler hinzugefügt
                        >
                            {search}
                        </button>))}
                </div>
            </div>
        </div>
    )
}