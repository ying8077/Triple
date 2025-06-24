-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-12-20 22:21:15
-- 伺服器版本： 10.4.21-MariaDB
-- PHP 版本： 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `triple`
--

-- --------------------------------------------------------

--
-- 資料表結構 `card`
--

CREATE TABLE `card` (
  `id` int(10) NOT NULL,
  `post_id` int(10) NOT NULL,
  `location_id` int(10) NOT NULL,
  `description` text NOT NULL,
  `recommend` float NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `card`
--

INSERT INTO `card` (`id`, `post_id`, `location_id`, `description`, `recommend`, `image`) VALUES
(1, 1, 1, '從宜蘭東澳到台東獨有的漸層藍😍\r\n我拍的點是：舊蘇花公路171.1km', 5, 'card1.png'),
(2, 3, 3, '前往貴船神社的途中有許多小瀑布', 5, 'card3.jpg'),
(3, 2, 2, '胡椒餅烤的很酥，然後皮也不會太厚，內餡肉算多\r\n肉的調味還蠻重，然後滿滿胡椒味，還蠻好吃的', 4, 'card2.png'),
(4, 4, 4, '心目中第一名的戚風！！！\r\n蛋糕體鬆軟有彈性，大愛抹茶口味💚\r\n淋醬很滑順濕潤完全可以再來一塊超好吃', 5, 'card4.png'),
(5, 5, 5, '往太麻里的路上 離太麻里車站跟椰林大道都不遠\r\n對面的巷子上去就是很有名的蓄水池', 4, 'card5.jpg'),
(6, 6, 6, '雖然民宿房外陽台就可以看日出\r\n但民宿距離三仙台不到五分鐘不去看好像有點可惜\r\n優點就是可以睡晚一點再出門😂😂😂', 5, 'card6.png'),
(7, 7, 7, '這邊已經是熱門景點\r\n就不用我多說了吧\r\n天氣好的時候也是滿曬的\r\n幸好有個涼亭可以稍做休息😆😆😆', 5, 'card7.jpg'),
(8, 1, 8, '太魯閣我本身也來了有3次，\r\n裡面本身就很多點可以走了，\r\n照片上是白楊步道。', 4, 'card8.jpg'),
(9, 1, 9, '相較七星潭充滿了遊客、遊覽車，曼波海灘真的少了很多人，\r\n這邊也能聽到海浪沖刷鵝卵石的療癒聲音，\r\n離七星潭也沒有很遠，大家喜歡安靜的話，不妨到這邊來。', 4.5, 'card9.png'),
(10, 1, 10, '這邊距離四八高地騎機車也才1分鐘吧，但卻沒什麼人，\r\n雖然不像四八高地能看到彎彎的海岸，但這邊也有不錯的風景，\r\n燈塔本身不能進入，可以在環保公園、或燈塔旁小路進去的平台拍照。', 3.5, 'card10.png'),
(21, 17, 24, '111', 5, '5d6769c1.png'),
(22, 18, 25, '111', 4.5, 'd44863f1.png'),
(23, 19, 26, 'ˇˇˇˇ', 4.5, '764c4e15.png');

-- --------------------------------------------------------

--
-- 資料表結構 `collection`
--

CREATE TABLE `collection` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `details` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `collection`
--

INSERT INTO `collection` (`id`, `user_id`, `name`, `details`) VALUES
(18, 4, '韓國 12/20-12/25', '{\"list\":[{\"id\":8,\"name\":\"太魯閣國家公園\",\"x\":\"24.209580\",\"y\":\"121.455580\"},{\"id\":10,\"name\":\"奇萊鼻燈塔\",\"x\":\"24.016130\",\"y\":\"121.643950\"},{\"id\":9,\"name\":\"曼波海灘\",\"x\":\"24.110980\",\"y\":\"121.634570\"},{\"id\":1,\"name\":\"清水斷崖\",\"x\":\"24.2057878\",\"y\":\"121.6717862\"}]}'),
(20, 4, '花蓮', '{\"list\":[{\"id\":1,\"name\":\"清水斷崖\",\"x\":\"24.205160\",\"y\":\"121.671000\"},{\"id\":8,\"name\":\"太魯閣國家公園\",\"x\":\"24.209580\",\"y\":\"121.455580\"}]}');

-- --------------------------------------------------------

--
-- 資料表結構 `location`
--

CREATE TABLE `location` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `latitude` decimal(9,7) NOT NULL,
  `longitude` decimal(10,7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `location`
--

INSERT INTO `location` (`id`, `name`, `latitude`, `longitude`) VALUES
(1, '清水斷崖', '24.2057878', '121.6717862'),
(2, '老吳碳烤燒烤餅', '24.7487134', '121.7490996'),
(3, '貴船神社', '35.1217028', '135.7607002'),
(4, 'Meller 墨樂咖啡', '23.0007195', '120.1642477'),
(5, '華源海灣 HuaYuan Bay', '22.6625274', '121.0267523'),
(6, '三仙台', '23.1248429', '121.4136392'),
(7, '加路蘭海岸', '22.8085117', '121.1949472'),
(8, '太魯閣國家公園', '24.2008090', '121.3141322'),
(9, '曼波海灘', '24.1102382', '121.6254322'),
(10, '奇萊鼻燈塔', '24.0159338', '121.6416775');

-- --------------------------------------------------------

--
-- 資料表結構 `post`
--

CREATE TABLE `post` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `likes` int(10) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `post`
--

INSERT INTO `post` (`id`, `user_id`, `title`, `description`, `likes`, `created_at`) VALUES
(1, 1, '是什麼讓我愛上了花蓮，去了15遍也不無聊', '大家好，這次來跟大家分享一下花蓮\r\n工作後的5年來，去了花蓮15遍了\r\n花蓮是我第一次獨旅的城市，享受那與自己對話，自由自在的城市。\r\n\r\n接下來就跟大家分享，我曾經去過的景點、美食\r\n我會盡量由北到南介紹😅\r\n那就開始吧', 1000, '2022-12-06 16:28:22'),
(2, 2, '吃不完的宜蘭美食', '因為只有不到一天半的時間，所以時間要把握一下\r\n儘量不要花在排隊的時間太久，這篇圖會有點多\r\n然後就大概簡略介紹店家\r\n\r\n8點多到宜蘭租完車，就從離最近的店開始吃', 200, '2022-12-07 00:28:22'),
(3, 1, '京都8天7夜簡易行程分享', '雖然上次前去京都已經是疫情前了，但還是簡單分享一下上次去京都時的簡易行程安排及一些隨拍。京都是目前我畢生最摯愛的城市(以國外來說)，純粹只是希望讓更多人愛上這座城市，也希望讓更多人願意為這個城市放慢腳步，多在京都停留幾天。', 250, '2022-12-07 16:28:22'),
(4, 2, '台南美食15間愛店分享✨', '大學四年至少去過台南20次吧有夠喜歡\r\n從高雄搭個火車咻～很快就到惹超方便\r\n分享幾間我的清單中秋連假有出去玩可以參考', 600, '2022-12-08 10:28:22'),
(5, 2, '#圖多 台東遊記 四天三夜-①景點篇', '每年去台東感覺已成了必要行程\r\n以下會有這次的景點\r\n可能也會有前幾次的\r\n一樣照片居多 不喜歡的請左滑哦\r\n不囉嗦 開始上圖', 450, '2022-12-18 12:28:22'),
(6, 2, '#圖多 台東遊記 四天三夜-②景點篇', '接續上上篇\r\n繼續來分享此次的遊玩景點', 200, '2022-12-18 13:28:22'),
(7, 2, '#圖多 台東遊記 四天三夜-③最終篇', '接著來到最後一篇\r\n謝謝大家看到這邊\r\n以下開始———', 200, '2022-12-18 15:28:22'),
(17, 4, '111', '222', 0, '2022-12-19 05:52:30'),
(18, 4, '1111', '1111', 0, '2022-12-19 06:27:23'),
(19, 4, 'dd', 'dd', 0, '2022-12-19 11:53:17');

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `picture`) VALUES
(1, '百變怪', 'test@gmail.com', '123456', NULL),
(2, '皮卡丘', 'test@gmail.com', '123456', NULL),
(3, '123', 'test3@gmail.com', '$2b$10$y8.46fvY9yZ4mh6k3MIUy.dY/eovy4cp35wmfJ4V3iDwbjle4rZ3K', NULL),
(4, 'duckkkk', 'test4@gmail.com', '$2b$10$iFqdPv.maYYg56/dmpU/yOk73knTo7UMX8Q3H9uEaoZDPIVM1gsyO', NULL),
(5, 'lucy', 'test5@gmail.com', '$2b$10$eA9B62rp5aoALIJHmGCmZeTD90eFShy8uEWozbw85QT.stXsWHQL2', NULL);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `card`
--
ALTER TABLE `card`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `collection`
--
ALTER TABLE `collection`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `location`
--
ALTER TABLE `location`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `post`
--
ALTER TABLE `post`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
