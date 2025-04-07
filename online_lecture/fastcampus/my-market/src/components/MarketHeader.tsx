import { Bell, Search } from "iconoir-react";

const MarketHeader = ({}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="w-48">
            <select
              className="select secelt-bordered w-full"
              defaultValue="default"
            >
              <option value="defalt" disabled>
                동네를 선택하세요
              </option>
              <option>역삼1동</option>
              <option>역삼2동</option>
              <option>삼성1동</option>
              <option>삼성2동</option>
              <option>청담동</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button className="btn btn-ghost btn-circle">
              <Search className="h-6 w-6" />
            </button>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <Bell className="h-6 w-6" />
                <span className="badge badge-sm badge-primary indicator-item"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MarketHeader;
