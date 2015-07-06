/**
 * Created by sheriefbadran on 12/4/14.
 */
function infoWindowContent (markerObj) {


    var title = markerObj.title == '' ? 'Titel saknas' : markerObj.title;
    var date = new Date(parseInt(markerObj.createddate.replace("/Date(", "").replace(")/",""), 10));
    var description = markerObj.description == '' ? 'Beskrivning saknas.' : markerObj.description;
    var subCategory = markerObj.subcategory == '' ? 'Underkategori saknas.' : markerObj.subcategory;

    this.getInfoMarkup = function () {

        var HTML = "<div>";
        HTML+=  "<h4>" + title + " - " + subCategory + "</h4>";
        HTML+=  "<p>" + description + "</p>";
        HTML+=  "<p>" + date.toLocaleDateString() + " : " + date.toLocaleTimeString() + "</p>";

        return HTML;
    };
}
