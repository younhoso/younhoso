import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useTabs(defaultTab: string) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = ({
    queryKey,
    queryValue,
  }: {
    queryKey: string;
    queryValue: string;
  }) => {
    setActiveTab(queryValue);
    navigate(`?${queryKey}=${queryValue}`);
  };

  return {
    activeTab,
    handleTabChange,
  };
}
