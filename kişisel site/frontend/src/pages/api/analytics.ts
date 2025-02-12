import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    // Google Analytics API kimlik bilgileri
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
      },
      scopes: ['https://www.googleapis.com/auth/analytics.readonly']
    })

    const analytics = google.analytics({
      auth,
      version: 'v3'
    })

    // Son 30 günlük verileri al
    const response = await analytics.data.ga.get({
      'ids': 'ga:' + process.env.GA_VIEW_ID,
      'start-date': '30daysAgo',
      'end-date': 'today',
      'metrics': 'ga:users,ga:sessions,ga:pageviews,ga:avgSessionDuration'
    })

    // Bugünün verilerini al
    const todayResponse = await analytics.data.ga.get({
      'ids': 'ga:' + process.env.GA_VIEW_ID,
      'start-date': 'today',
      'end-date': 'today',
      'metrics': 'ga:users,ga:sessions,ga:pageviews'
    })

    // En çok ziyaret edilen sayfalar
    const topPagesResponse = await analytics.data.ga.get({
      'ids': 'ga:' + process.env.GA_VIEW_ID,
      'start-date': '30daysAgo',
      'end-date': 'today',
      'metrics': 'ga:pageviews',
      'dimensions': 'ga:pagePath',
      'sort': '-ga:pageviews',
      'max-results': 5
    })

    res.status(200).json({
      totalVisits: response.data.rows?.[0]?.[1] ?? 0,
      todayVisits: todayResponse.data.rows?.[0]?.[1] ?? 0,
      activeUsers: todayResponse.data.rows?.[0]?.[0] ?? 0,
      averageTime: Math.round(Number(response.data.rows?.[0]?.[3] ?? 0) / 60),
      topPages: topPagesResponse.data.rows?.map(row => ({
        path: row[0],
        views: parseInt(row[1])
      })) ?? []
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Analytics verisi alınamadı' })
  }
} 