import React from 'react'
import {Link} from 'react-router-dom'


export default function PostMetaInfo({by, time, id, descendants}: PostMetaInfoProps) {
    return (
        <div className={`meta-info-light`}>
        <span>by <Link to={`/user?id=${by}`}>{by}</Link></span>
        <span> on {formatDate(time)}</span>
        {typeof descendants === 'number' && (
          <span>
            with <Link to={`/post?id=${id}`}>{descendants}</Link> comments
          </span>
        )}
      </div>
    )
}

type PostMetaInfoProps = {
    by: string;
    time: number;
    id: number;
    descendants: number
}

function formatDate(timestamp: number) {
    return new Date(timestamp * 1000)
      .toLocaleDateString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
      })
  }