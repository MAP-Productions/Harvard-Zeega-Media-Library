The core of this user experience is to allow a large collection of heterogeneous multimedia materials (e.g. images, audio, videos) to be explored through a single, integrated discovery interface that is tightly coupled with curation tools for building collections. These curated materials are then available for further use in an authoring environment for multimedia presentations, and these presentations then also become part of the overall library collection, available through the same core discovery and curation interface. 

The primary features include: 

Full Media Library and My Media
We implemented the ability to toggle between all media in the library and one’s own personal collections and media. This feature enables the system to support a full-scale library index, available for discovery by any user. But then users can curate their own collections, and toggle to view only these items. 

My Collections and Media Library
We updated the interface so that was possible to seamlessly view all of the media in the library and thumbnails of items in one’s own collections in a sidebar (a la iTunes). We also made it possible to view the individual items in a collection within the main media browser and to search within the collection by keyword and tag. 

Annotating Collections as Items
We made it possible to view and annotate the metadata for a collection, standardizing a collection as an item like other items in the system. (Previously, items were only individual photos, videos and audio recordings). 

Smart Collections
We created “smart collections,” which auto-populate with items of a common tag (e.g. dog). These collections are distinguished in the collections drawer visually from manually curated collections. 

Tagging Collections
We made it possible to tag collections. These means that collections can also appear in smart collections. 

Tag Search
We implemented the ability to search the media library for all items with a common tag (including collections as items). This tag search is made possible by the SOLR index 

Integration with the Zeega Authoring Environment
We implemented the crucial link of enabling a user to access their own collections within the Zeega authoring environment. This means that a user who creates collections can then use this media in a multimedia presentation. This integration was executed by adding a dropdown to the media library portion of the Zeega editor; once a collection is selected, those items are made visible and can be dragged and dropped into a Zeega presentation.

Zeega Presentations as Items in the Media Library 
The final work completed to close the loop was to make Zeega presentations themselves items that could be discovered and curated from within the core media library interface. Through the MySQL/SOLR sync, this was work was completed, and Zeega presentations can be tagged just like all other items, and can also be brought into manually curated collections, as well as smart collections. 
