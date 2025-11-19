import { MdDashboard } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { MdToday } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";

import "./Sidebar.css";
import { useContext, useState, useEffect } from "react";
import { GeneralContext } from "../../App";
import { getToken } from "../../utils/util";

export default function Sidebar() {
  const [recentArticles, setRecentArticles] = useState([]);

  const [stats, setStats] = useState({
    totalArticles: 0,
    totalViews: 0,
    todaysArticles: 0,
  });

  const { setIsLoading } = useContext(GeneralContext);

  useEffect(() => {
    fetchSidebarData();
  }, []);

  async function fetchSidebarData() {
    const token = getToken();
    if (!token) return;
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/articles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const articles = await response.json();

      const sorted = articles.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setRecentArticles(sorted);
      const today = new Date().toDateString();
      const todayCount = articles.filter(
        (t) => new Date(t.createdAt).toDateString() === today
      ).length;

      setStats({
        totalArticles: articles.length,
        totalViews: articles.reduce((sum, v) => sum + v.views, 0),
        todaysArticles: todayCount,
      });

      console.log(todayCount);

      setRecentArticles(articles);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>
          Dashboard <MdDashboard />
        </h3>
      </div>
      <div className="stats-flex">
        <div className="stat-card">
          <div className="stat-icon">
            <IoDocumentTextOutline size={22} />
          </div>
          <div className="stat-info">
            <span>Total Articles - </span>
            <span className="views-color">{stats.totalArticles}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <IoEyeSharp size={22} />
          </div>

          <div className="stat-info">
            <span>Total Views - </span>
            <span className="views-color">{stats.totalViews}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <MdToday size={22} />
          </div>

          <div className="stat-info">
            <span>Today's Articles - </span>
            <span className="views-color">{stats.todaysArticles}</span>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>
          Recent Activity <IoTimeOutline />
        </h3>
      </div>
    </aside>
  );
}
