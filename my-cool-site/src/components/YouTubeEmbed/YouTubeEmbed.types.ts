export interface YouTubeEmbedProps {
  /**
   * The YouTube video ID (the part after 'v=' in the URL)
   * Example: For 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', the videoId is 'dQw4w9WgXcQ'
   */
  videoId: string;
  
  /**
   * Title of the video
   */
  title: string;
  
  /**
   * Optional description for the video
   */
  description?: string;
  
  /**
   * Optional className for custom styling
   */
  className?: string;
}
