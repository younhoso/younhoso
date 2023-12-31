import { useState } from "react";
import { useNavigate } from "react-router-dom";

type TabProps = {
  queryKey: string;
  queryValue: string;
};

export default function useTabs({ queryKey, queryValue }: TabProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState({ queryKey, queryValue });

  const handleTabChange = ({ queryKey, queryValue }: TabProps) => {
    setActiveTab({ queryKey, queryValue });
    navigate(`?${queryKey}=${queryValue}`);
  };

  return {
    activeTab,
    handleTabChange,
  };
}
