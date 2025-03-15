---
layout: default
title: My blog
---
# My blog

<ul>
{% for post in site.posts %}
   <li>
      <a href="{{ post.url }}">
         <div class="posts-card">
            <h2>{{ post.title }}</h2>
            <p style="font-size: small;">
               {% assign lines = post.excerpt | strip_html | split: '\n' %}
               {% if lines.size > 1 %}
                  {{ lines[1] | strip | truncate: 100, '' }}...
               {% else %}
                  {{ lines[0] | strip | truncate: 100, '' }}...
               {% endif %}
            </p>
            <small>Published on {{ post.date | date: "%B %d, %Y" }}</small>
         </div>
      </a>
   </li>
{% endfor %}
</ul>
