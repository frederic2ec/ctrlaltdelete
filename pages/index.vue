<template>
  <v-layout column justify-center align-center>
    <v-flex md12>
      <v-layout row wrap>
        <v-flex
          v-for="(post, index) in listItems"
          :key="index"
          v-scroll-reveal.reset
          md4
          pa-2
        >
          <v-card :href="post.link" class="animated bounceIn delay-2s">
            <v-img v-if="post.image.url" :src="post.image.url" />
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">
                  {{ post.title }}
                </h3>
                <div>{{ post.summary | striphtml }}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat>
                {{ post.date | formatDate }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Gaming',
  data() {
    return {
      posts: [],
      url: [
        'https://www.gamezone.com/feed/',
        'http://feeds.ign.com/ign/news?format=xml',
        'https://kotaku.com/rss',
        'https://www.pcgamer.com/rss'
      ]
    }
  },
  computed: {
    listItems() {
      return _.orderBy(this.posts, 'date', 'desc')
    }
  },
  mounted() {
    this.fetchRss()
  },
  methods: {
    fetchRss() {
      const FeedParser = require('feedparser')
      const request = require('request') // for fetching the feed
      const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

      for (let i = 0; i < this.url.length; i++) {
        const req = request(CORS_PROXY + this.url[i])

        const feedparser = new FeedParser()
        req.on('response', (res) => {
          const stream = req // `this` is `req`, which is a stream

          if (res.statusCode !== 200) {
            this.emit('error', new Error('Bad status code'))
          } else {
            stream.pipe(feedparser)
          }
        })

        feedparser.on('readable', () => {
          // This is where the action is!
          const stream = feedparser // `this` is `feedparser`, which is a stream
          let item

          while ((item = stream.read())) {
            this.posts.push(item)
          }
        })
      }
    }
  },
  head() {
    return {
      title: 'Gaming'
    }
  }
}
</script>
