import React, { useState } from 'react';
import { Award, Trophy, Zap, Target, Medal, TrendingUp } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  staffId: string;
  staffName: string;
  branchName: string;
  score: number;
  metric: string;
  trend: 'up' | 'down' | 'stable';
  badge?: string;
  percentage: number;
}

interface StaffLeaderboardProps {
  period?: 'daily' | 'weekly' | 'monthly' | 'all-time';
  category?: 'uploads' | 'scans' | 'compression' | 'quality' | 'engagement';
  onClose?: () => void;
}

// মক লিডারবোর্ড ডেটা
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    staffId: 'staff-001',
    staffName: 'করিম আহমেদ',
    branchName: 'ঢাকা শাখা',
    score: 234,
    metric: 'ছবি',
    trend: 'up',
    badge: '🥇',
    percentage: 100,
  },
  {
    rank: 2,
    staffId: 'staff-002',
    staffName: 'ফারিহা রহমান',
    branchName: 'ঢাকা শাখা',
    score: 198,
    metric: 'ছবি',
    trend: 'up',
    badge: '🥈',
    percentage: 85,
  },
  {
    rank: 3,
    staffId: 'staff-003',
    staffName: 'রহিম খান',
    branchName: 'চট্টগ্রাম শাখা',
    score: 187,
    metric: 'ছবি',
    trend: 'down',
    badge: '🥉',
    percentage: 80,
  },
  {
    rank: 4,
    staffId: 'staff-004',
    staffName: 'নাজমা বেগম',
    branchName: 'সিলেট শাখা',
    score: 165,
    metric: 'ছবি',
    trend: 'up',
    percentage: 71,
  },
  {
    rank: 5,
    staffId: 'staff-005',
    staffName: 'করিম সাহেব',
    branchName: 'খুলনা শাখা',
    score: 142,
    metric: 'ছবি',
    trend: 'stable',
    percentage: 61,
  },
];

const ACHIEVEMENT_BADGES = [
  { id: 'top-uploader', title: '🌟 শীর্ষ আপলোডার', condition: 'সর্বোচ্চ ছবি' },
  {
    id: 'compression-master',
    title: '🎯 কম্প্রেশন মাস্টার',
    condition: '৯০%+ অনুপাত',
  },
  { id: 'quality-champion', title: '✨ গুণমান চ্যাম্পিয়ন', condition: '৯৫%+ অনুমোদন' },
  { id: 'speed-demon', title: '⚡ স্পিড ডেমন', condition: 'দ্রুততম প্রক্রিয়াকরণ' },
  { id: 'consistency-king', title: '👑 সামঞ্জস্য রাজা', condition: '৩০ দিন সক্রিয়' },
  { id: 'team-player', title: '🤝 টিম প্লেয়ার', condition: 'উচ্চ এনগেজমেন্ট' },
];

export const StaffLeaderboard: React.FC<StaffLeaderboardProps> = ({
  period = 'monthly',
  category = 'uploads',
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(category);
  const [selectedPeriod, setSelectedPeriod] = useState<string>(period);

  const getAchievementIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '🎖️';
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'uploads':
        return 'শীর্ষ আপলোডার';
      case 'scans':
        return 'শীর্ষ স্ক্যানার';
      case 'compression':
        return 'সেরা কম্প্রেশন';
      case 'quality':
        return 'সর্বোচ্চ গুণমান';
      case 'engagement':
        return 'সর্বোচ্চ এনগেজমেন্ট';
      default:
        return 'লিডারবোর্ড';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto space-y-6">
      {/* হেডার */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              লিডারবোর্ড
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {getCategoryLabel(selectedCategory)} • {selectedPeriod}
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ফিল্টার */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ক্যাটাগরি
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="uploads">শীর্ষ আপলোডার</option>
            <option value="scans">শীর্ষ স্ক্যানার</option>
            <option value="compression">সেরা কম্প্রেশন</option>
            <option value="quality">সর্বোচ্চ গুণমান</option>
            <option value="engagement">সর্বোচ্চ এনগেজমেন্ট</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            সময়কাল
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="daily">আজ</option>
            <option value="weekly">এই সপ্তাহ</option>
            <option value="monthly">এই মাস</option>
            <option value="all-time">সর্বকাল</option>
          </select>
        </div>
      </div>

      {/* লিডারবোর্ড তালিকা */}
      <div className="space-y-2">
        {MOCK_LEADERBOARD.map((entry, index) => (
          <div
            key={entry.staffId}
            className={`p-4 rounded-lg border-l-4 transition hover:shadow-md ${
              index === 0
                ? 'bg-yellow-50 border-yellow-500'
                : index === 1
                  ? 'bg-gray-50 border-gray-400'
                  : index === 2
                    ? 'bg-orange-50 border-orange-400'
                    : 'bg-white border-blue-300'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* র‍্যাঙ্ক ব্যাজ */}
              <div className="text-3xl font-bold min-w-max">
                {getAchievementIcon(entry.rank)}
              </div>

              {/* কর্মচারী তথ্য */}
              <div className="flex-1">
                <div className="font-bold text-gray-800">
                  {entry.rank}. {entry.staffName}
                </div>
                <p className="text-sm text-gray-600">{entry.branchName}</p>
              </div>

              {/* স্কোর এবং ট্রেন্ড */}
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">
                  {entry.score}
                </div>
                <div className="flex items-center justify-end gap-1 mt-1">
                  {entry.trend === 'up' && (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  )}
                  <span className="text-xs font-semibold text-gray-600">
                    {entry.metric}
                  </span>
                </div>
              </div>

              {/* প্রগ্রেস বার */}
              <div className="min-w-max">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      index === 0
                        ? 'bg-yellow-600'
                        : index === 1
                          ? 'bg-gray-400'
                          : 'bg-orange-600'
                    }`}
                    style={{ width: `${entry.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {entry.percentage}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* অর্জন ব্যাজ বিভাগ */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Medal className="w-5 h-5 text-purple-600" />
          অর্জন ব্যাজ
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ACHIEVEMENT_BADGES.map((badge) => (
            <div
              key={badge.id}
              className="bg-white p-3 rounded-lg border border-gray-200 text-center hover:shadow-md transition"
            >
              <p className="text-2xl mb-1">{badge.title.split(' ')[0]}</p>
              <p className="text-xs font-semibold text-gray-700">
                {badge.title.split(' ').slice(1).join(' ')}
              </p>
              <p className="text-xs text-gray-500 mt-1">{badge.condition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* পরিসংখ্যান সারাংশ */}
      <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
        <div className="text-center">
          <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-xs text-gray-600">মোট অংশগ্রহণকারী</p>
          <p className="text-xl font-bold text-gray-800 mt-1">
            {MOCK_LEADERBOARD.length}+
          </p>
        </div>
        <div className="text-center">
          <Zap className="w-6 h-6 text-orange-600 mx-auto mb-2" />
          <p className="text-xs text-gray-600">গড় প্রতিযোগিতা</p>
          <p className="text-xl font-bold text-gray-800 mt-1">৮৫%</p>
        </div>
        <div className="text-center">
          <Award className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
          <p className="text-xs text-gray-600">মাসিক পুরস্কার</p>
          <p className="text-xl font-bold text-gray-800 mt-1">৫০০ টাকা</p>
        </div>
      </div>

      {/* ফুটার বার্তা */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
        <p className="text-sm text-blue-900 font-medium">
          🎉 লিডারবোর্ডে শীর্ষস্থানীয় ৫ জন প্রতি মাসে বিশেষ পুরস্কার পাবেন!
        </p>
      </div>
    </div>
  );
};
