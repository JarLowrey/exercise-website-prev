module ShortenableUrls
    def self.redirect_for_readability?(request, id, readable_txt_parameterized)
        #check if column_name is not seen in the URL of an HTML request
        if request.format.html? #do not care how URL looks for json/data requests
            id = id.to_s

            #parse out the URL text following the id
            url = request.original_url
            id_end_indx = url.index(id) + (id).length + 1 #+1 for '/' character

            #URL txt after id does not match readable_txt
            if url[id_end_indx..-1] != readable_txt_parameterized
                return true
            end
        end

        return false
    end
end