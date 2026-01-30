'use client';

import { PaginationInfo } from '@/app/lib/api';

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
}

export default function Pagination({ pagination, onPageChange, showInfo = true }: PaginationProps) {
  const { page, limit, total, total_pages } = pagination;
  
  // 生成页码数组
  const generatePageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 7; // 最多显示7个页码
    
    if (total_pages <= maxVisible) {
      // 总页数少于最大显示数，显示所有页码
      for (let i = 1; i <= total_pages; i++) {
        pages.push(i);
      }
    } else {
      // 总页数较多，智能显示
      if (page <= 4) {
        // 前几页
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push(-1); // 省略号
        pages.push(total_pages);
      } else if (page >= total_pages - 3) {
        // 后几页
        pages.push(1);
        pages.push(-1); // 省略号
        for (let i = total_pages - 4; i <= total_pages; i++) {
          pages.push(i);
        }
      } else {
        // 中间页
        pages.push(1);
        pages.push(-1); // 省略号
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push(-1); // 省略号
        pages.push(total_pages);
      }
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const handlePageClick = (newPage: number) => {
    if (newPage !== page && newPage >= 1 && newPage <= total_pages) {
      onPageChange(newPage);
    }
  };

  if (total_pages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      {/* 分页信息 */}
      {showInfo && (
        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          显示第 {(page - 1) * limit + 1} - {Math.min(page * limit, total)} 条，共 {total} 条记录
        </div>
      )}
      
      {/* 分页按钮 */}
      <nav className="flex items-center space-x-1">
        {/* 上一页 */}
        <button
          onClick={() => handlePageClick(page - 1)}
          disabled={page === 1}
          className="px-3 py-2 text-sm font-medium rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{
            color: 'var(--text-secondary)',
            background: 'var(--card-bg)',
            border: `1px solid var(--border-color)`,
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          上一页
        </button>
        
        {/* 页码 */}
        {pageNumbers.map((pageNum, index) => {
          if (pageNum === -1) {
            // 省略号
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-gray-500">
                ...
              </span>
            );
          }
          
          return (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className="px-3 py-2 text-sm font-medium transition-colors border"
              style={
                pageNum === page
                  ? {
                      background: '#1677ff',
                      color: '#fff',
                      borderColor: '#1677ff',
                    }
                  : {
                      color: 'var(--text-secondary)',
                      background: 'var(--card-bg)',
                      borderColor: 'var(--border-color)',
                    }
              }
            >
              {pageNum}
            </button>
          );
        })}
        
        {/* 下一页 */}
        <button
          onClick={() => handlePageClick(page + 1)}
          disabled={page === total_pages}
          className="px-3 py-2 text-sm font-medium rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{
            color: 'var(--text-secondary)',
            background: 'var(--card-bg)',
            border: `1px solid var(--border-color)`,
          }}
        >
          下一页
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
      
      {/* 快速跳转 */}
      {total_pages > 5 && (
        <div className="flex items-center space-x-2 text-sm">
          <span style={{ color: 'var(--text-secondary)' }}>跳转到</span>
          <input
            type="number"
            min={1}
            max={total_pages}
            className="w-16 px-2 py-1 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              background: 'var(--card-bg)',
              color: 'var(--text-primary)',
              border: `1px solid var(--border-color)`,
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const targetPage = parseInt((e.target as HTMLInputElement).value);
                if (targetPage >= 1 && targetPage <= total_pages) {
                  handlePageClick(targetPage);
                }
              }
            }}
          />
          <span style={{ color: 'var(--text-secondary)' }}>页</span>
        </div>
      )}
    </div>
  );
}
