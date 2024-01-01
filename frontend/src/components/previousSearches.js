

export default function PreviousSearches() {
    const searches = [
        'pizza',
        'burger',
        'cookies',
        'juice',
        'salad',
        'ice cream',
        'lasagna',
        'pudding',
        'soup',

    ]
    return (
        <div>
            <div className="previous-searches section">
                <h2>Popular Searches</h2>
                <div className="previous-searches-container">
                    {searches.map((search, index) => (<div key={index} style={{animationDelay: index *.1 + "s" }} className="search-item">
                        {search}
                    </div>))}
                </div>
            </div>
        </div>
    )
}