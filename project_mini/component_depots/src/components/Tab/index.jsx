import React, { useEffect, useState } from "react";

const Tab = ({ children, active = 0 }) => {
  const [activeTab, setActiveTab] = useState(active);
  const [tabsData, setTabsData] = useState([]);

  useEffect(() => {
    let data = [];

    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return;
      const {
        props: { tab, children },
      } = element;
      data.push({ tab, children });
    });

    setTabsData(data);
  }, [children]);

  return (
    <div className="w-100">
      <ul className="nav nav-tab">
        {tabsData.map(({ tab }, idx) => (
          <li className="nav-item" key={idx}>
            <a
              className={`nav-link ${idx === activeTab ? "active" : ""}`}
              href="#0"
              onClick={() => setActiveTab(idx)}
            >
              {tab}
            </a>
          </li>
        ))}
      </ul>

      <div className="tab-content p-3">
        {tabsData[activeTab] && tabsData[activeTab].children}
      </div>
    </div>
  );
};

const TabPane = ({ children }) => {
  return { children };
};
Tab.TabPane = TabPane;

export default Tab;
