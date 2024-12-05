import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  Pagination,
  getLastPage,
  getVisibleResultsMax,
  getVisibleResultsMin,
} from '@workday/canvas-kit-react/pagination';

function App() {
  const [searchType, setSearchType] = useState(() => {
    return localStorage.getItem("searchType") || "date_time";
  });
  const [searchValue, setSearchValue] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearched, setIsSearched] = useState(false); // Trạng thái kiểm tra đã tìm kiếm hay chưa
  const [loading, setLoading] = useState(false); // Trạng thái kiểm tra dữ liệu đang được tải về
  const [noResults, setNoResults] = useState(false); // Trạng thái không có kết quả

  // Hàm fetch dữ liệu
  const fetchData = useCallback(
    async (page = currentPage) => {
      setLoading(true);
      setNoResults(false);
      try {
        const response = await fetch(
          `/search?attribute=${searchType}&data=${searchValue}&page=${page - 1}` // Chuyển `page` thành số trang bắt đầu từ 0
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const processedData = result.data.map((item) => {
          const fields = item.split(",");
          return {
            date_time: fields[0].replace(/"/g, ""),
            trans_no: fields[1],
            credit: fields[2],
            debit: fields[3],
            detail: fields[4].replace(/"/g, ""),
          };
        });
  
        setFilteredResults(processedData);
        setTotalPages(result.totalPages);
        setIsSearched(true);
  
        if (processedData.length === 0) {
          setNoResults(true);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    },
    [currentPage,searchType, searchValue]
  );
  

  // Hàm xử lý sự kiện tìm kiếm
  const handleSearch = () => {
    setCurrentPage(1); // Đặt lại trang về trang 1 khi tìm kiếm
    setIsSearched(false); // Đặt lại trạng thái tìm kiếm trước khi gọi API
    fetchData(); // Gọi API để lấy kết quả
  };

  // Hàm xử lý sự kiện chuyển trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber); // Cập nhật `currentPage`
      fetchData(pageNumber); // Gọi API với số trang
    }
  };
  
  

  // Hàm highlight văn bản
  const highlightText = (text) => {
    if (!searchValue) {
      return text;
    }
    const regex = new RegExp(`(${searchValue})`, "gi");
    return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
  };

  // Hàm điều kiện để chỉ highlight cột tương ứng
  const renderCell = (item, field) => {
    const value = item[field];
    return (
      <td
        dangerouslySetInnerHTML={{
          __html: searchType === field ? highlightText(value) : value,
        }}
      ></td>
    );
  };

  // Thiết lập phân trang với @workday/canvas-kit-react/pagination
  const resultCount = filteredResults.length;
  const lastPage = getLastPage(resultCount, totalPages);

  // Hàm để reload lại trang
  const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    localStorage.setItem("searchType", searchType);
  }, [searchType]);

  return (
    <div className="App">
      <h1>Tra cứu dữ liệu Sao Kê</h1>

      {/* Tìm kiếm */}
      <div className="search-options">
        <button
          onClick={() => {
            setSearchType("date_time");
            setSearchValue(""); // Reset giá trị tìm kiếm
            setIsSearched(false); // Đặt trạng thái là chưa tìm kiếm
            window.location.reload(); // Reload trang
          }}
        >
          Date_Time
        </button>
        <button
          onClick={() => {
            setSearchType("trans_no");
            setSearchValue("");
            setIsSearched(false);
            window.location.reload(); // Reload trang
          }}
        >
          Trans_no
        </button>
        <button
          onClick={() => {
            setSearchType("credit");
            setSearchValue("");
            setIsSearched(false);
            window.location.reload(); // Reload trang
          }}
        >
          Credit
        </button>
        <button
          onClick={() => {
            setSearchType("debit");
            setSearchValue("");
            setIsSearched(false);
            window.location.reload(); // Reload trang
          }}
        >
          Debit
        </button>
        <button
          onClick={() => {
            setSearchType("detail");
            setSearchValue("");
            setIsSearched(false);
            window.location.reload(); // Reload trang
          }}
        >
          Detail
        </button>
      </div>

      <div className="search-input">
        <input
          type={["credit", "debit"].includes(searchType) ? "number" : "text"}
          placeholder={`Nhập ${searchType === "date_time"
            ? "Ngày/Tháng/Năm"
            : searchType === "trans_no"
              ? "Trans_no"
              : searchType === "credit"
                ? "Credit"
                : searchType === "debit"
                  ? "Debit"
                  : "Detail"
            }`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>

      {/* Hiển thị trạng thái tìm kiếm */}
      {loading && <p>Đang tìm kiếm...</p>}

      {/* Kết quả tìm kiếm */}
      {isSearched && !loading && ( // Chỉ hiển thị kết quả nếu đã tìm kiếm và không còn trạng thái loading
        <div className="results">
          <h2>Kết quả tìm kiếm:</h2>
          {noResults && (
            <p className="error-message">Không tìm thấy kết quả tìm kiếm</p>
          )}
          {filteredResults.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Date_Time</th>
                  <th>Trans_no</th>
                  <th>Credit</th>
                  <th>Debit</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((item, index) => (
                  <tr key={index}>
                    {renderCell(item, "date_time")}
                    {renderCell(item, "trans_no")}
                    {renderCell(item, "credit")}
                    {renderCell(item, "debit")}
                    {renderCell(item, "detail")}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Phân trang */}
          {filteredResults.length > 0 && (
            <Pagination
              currentPage={currentPage} // Truyền currentPage vào Pagination
              onPageChange={handlePageChange} // Gọi hàm khi chuyển trang
              aria-label="Pagination"
              lastPage={lastPage}
              className="custom-pagination"
            >

              <Pagination.Controls>
              {/* Nút chuyển về trang đầu */}
              <button
                aria-label="Go to First Page"
                className="page-nav-button"
                onClick={() => handlePageChange(1)} // Đảm bảo truyền `1` để đồng nhất
                disabled={currentPage === 1} // Vô hiệu hóa nếu đang ở trang đầu tiên
              >
                &laquo; First
              </button>

              {/* Nút giảm trang */}
              <button
                aria-label="Previous Page"
                className="page-nav-button"
                onClick={() => {
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                disabled={currentPage === 1} // Vô hiệu hóa nếu đang ở trang đầu tiên
              >
                &lt;
              </button>
                <Pagination.PageList fontSize="500px">
                  {({ state }) => {
                    const maxVisiblePages = 5; // Số trang hiển thị mỗi lần
                    const startPage = Math.max(
                      1,
                      currentPage - Math.floor(maxVisiblePages / 2)
                    );
                    const endPage = Math.min(
                      totalPages,
                      startPage + maxVisiblePages - 1
                    );

                    const range = Array.from(
                      { length: endPage - startPage + 1 },
                      (_, i) => startPage + i
                    );

                    return range.map((pageNumber) => (
                      
                      <Pagination.PageListItem key={pageNumber} className="page-item">
                        <Pagination.PageButton
                          aria-label={`Page ${pageNumber}`}
                          pageNumber={pageNumber}
                          className={`page-button ${pageNumber === currentPage ? "active" : ""}`}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </Pagination.PageButton>
                      </Pagination.PageListItem>
                    ));
                  }}
                </Pagination.PageList>
                {/* Nút tăng trang */}
                <button
                  aria-label="Next Page"
                  className="page-nav-button"
                  onClick={() => {
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                  disabled={currentPage === totalPages} // Vô hiệu hóa nếu đang ở trang cuối cùng
                >
                  &gt;
                </button>
                {/* Nút chuyển về trang cuối */}
                <button
                  aria-label="Go to Last Page"
                  className="page-nav-button"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages} // Vô hiệu hóa nếu đang ở trang cuối cùng
                >
                  Last &raquo;
                </button>
              </Pagination.Controls>
              <Pagination.AdditionalDetails shouldHideDetails className="pagination-details">
                {({ state }) =>
                  `${getVisibleResultsMin(state.currentPage, resultCount)}-${getVisibleResultsMax(
                    state.currentPage,
                    resultCount,
                    totalPages
                  )} of ${totalPages} results`
                }
              </Pagination.AdditionalDetails>
            </Pagination>
          )}
        </div>
      )}

      {/* Nếu không tìm thấy kết quả */}
      {noResults && (
        <div>
          <button onClick={handleReload}>Reload trang</button>
        </div>
      )}
    </div>
  );
}

export default App;
