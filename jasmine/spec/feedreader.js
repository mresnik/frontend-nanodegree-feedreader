/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */
$(function() {

    var classes = (document.body.classList),
        menuIcon = $('.menu-icon-link');

    describe('RSS Feeds', function() {

        /* This first test confirms that the allFeeds variable
         * has been defined and that it is not empty.
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test that loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL is not empty.
         */

        it('has a url', function() {
            for (i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* This test loops through each feed in the allFeeds object and
         * ensures it has a name defined and that the name is not empty.
         */

        it('has a name', function() {
            for (i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    describe('The menu', function() {

        /*
         * This test that ensures the menu element is hidden by default.
         */

        it('is hidden by default', function() {
            expect(classes).toContain('menu-hidden');
        });

        /* This test nsures the menu changes visibility when the
         * menu icon is clicked. This test has two expectations:
         * that the menu displays when clicked and that is hides
         * when clicked again.
         */

        it('changes visibility when clicked', function() {
            menuIcon.trigger('click');
            expect(classes).not.toContain('menu-hidden');
            menuIcon.trigger('click');
            expect(classes).toContain('menu-hidden');
        });
    });

    describe('Initial Entries', function() {

        /* This test ensures when the loadFeed function is called and
         * completes its work, there is at least a single .entry element
         * within the .feed container. loadFeed() is asynchronous so this
         * test uses Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('creates one or more Entries', function(done) {
            var elements = document.querySelector('.feed').querySelectorAll('.entry-link');
            expect(elements.length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {

        /* This test ensures that when a new feed is loaded by the loadFeed
         * function that the content actually changes.
         */

        var oldContent = "",
            newContent = "";

        beforeEach(function(done) {
            loadFeed(0, function() {
                oldContent = document.querySelector('.feed').innerHTML;
            });
            setTimeout(function() {
                loadFeed(1, function() {
                    newContent = document.querySelector('.feed').innerHTML;
                    loadFeed(0);
                    done();
                }, 2500);
            });
        });

        it('changes one or more Entries', function(done) {
            expect(oldContent).not.toEqual(newContent);
            done();
        });
    });

});
