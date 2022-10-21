import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Redirect() {
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => navigate("/wanted-pre-onboarding-frontend"), []);
}
