Why reference Songs in Playlist?

Songs are referenced instead of embedded to avoid data duplication. A single song can belong to multiple playlists, so embedding would repeat the same data in many places. By storing only song IDs, playlists stay lightweight, and updates to a song need to be made only once. This improves scalability, consistency, and maintainability.

Why reference Artist in Song?

The Artist is referenced because one artist can have many songs. Referencing prevents repeating artist data in every song document. It allows updates to be made in one place and keeps data consistent. It also enables flexible queries, such as fetching all songs by an artist or using .populate() to get full artist details.
