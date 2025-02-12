import React from "react";
import PropTypes from "prop-types";

function Pagination({
                        activePage,
                        itemsCountPerPage,
                        totalItemsCount,
                        pageRangeDisplayed,
                        prevPageText,
                        nextPageText,
                        onChange
                    }) {
    const totalPages = Math.ceil(totalItemsCount / itemsCountPerPage); // 전체 페이지 수 계산

    const handlePageClick = (page) => {
        onChange(page);
    };

    // 페이지 번호 배열 생성
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center mt-4">
            {/* 이전 페이지 버튼 */}
            <button
                onClick={() => handlePageClick(activePage - 1)}
                disabled={activePage === 1}
                className="px-4 py-2 mx-1 bg-gray-200 rounded-lg disabled:bg-gray-300"
            >
                {prevPageText}
            </button>

            {/* 페이지 번호 버튼 */}
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => handlePageClick(number)}
                    className={`px-4 py-2 mx-1 rounded-lg ${
                        activePage === number
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                    }`}
                >
                    {number}
                </button>
            ))}

            {/* 다음 페이지 버튼 */}
            <button
                onClick={() => handlePageClick(activePage + 1)}
                disabled={activePage === totalPages}
                className="px-4 py-2 mx-1 bg-gray-200 rounded-lg disabled:bg-gray-300"
            >
                {nextPageText}
            </button>
        </div>
    );
}

Pagination.propTypes = {
    activePage: PropTypes.number.isRequired,
    itemsCountPerPage: PropTypes.number.isRequired,
    totalItemsCount: PropTypes.number.isRequired,
    pageRangeDisplayed: PropTypes.number,
    prevPageText: PropTypes.string,
    nextPageText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default Pagination;
