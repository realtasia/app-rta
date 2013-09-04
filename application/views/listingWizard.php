<section class="RTAWindow slimWidth" id="listingCreationWizard">
    <header class="titleBar">
        <div class="contentArea titleBarBG">
            <h4>Listing Wizard <small>- Completed: <span class="number" data-bind="text: currentStep() / totalSteps * 100 + '%'"></span></small></h4>
            <div class="RTprogressbar">
                <div data-bind="style:{width: currentStep() / totalSteps * 100 + '%'}"></div>
            </div>
        </div>
    </header>
    <nav class="windowMenuBar">
        <ul class="windowMenu">
            <li data-bind="hoverClass: 'hovering'">
                <a class="windowMenuItem" href="#" data-bind="css:{disabled: !currentStep() > 0}, click:goBack"><i class="Round26 back"></i>Back</a>
            </li>
            <li data-bind="hoverClass: 'hovering'">
                <a class="windowMenuItem" href="#" data-bind="css:{disabled: enableNext()}, click:progressStep"><i class="Round26 next"></i>Next</a>
            </li>
            <li data-bind="hoverClass: 'hovering'">
                <a class="windowMenuItem" href="#" data-bind="css:{disabled: currentStep() <= 0}, click:resetSteps"><i class="Round26 reset"></i>Reset</a>
            </li>
            <li data-bind="hoverClass: 'hovering'">
                <a class="windowMenuItem" href="#" data-bind="css:{disabled: !currentStep() > 0}, click:save"><i class="Round26 draft"></i>Save</a>
            </li>
            <li data-bind="hoverClass: 'hovering'">
                <a class="windowMenuItem" href="#" data-bind="css:{disabled: !isStepComplete(5)}, click:publish"><i class="Round26 publish"></i>Publish</a>
            </li>
            <li data-bind="hoverClass: 'hovering'">
                <a class="windowMenuItem" href="#" data-bind="click:cancel"><i class="Round26 cancel"></i>Cancel</a>
            </li>
        </ul>
    </nav>
    <section class="RTAWindowContainer">
        <section class="RTAWindowContent noSidebar">
            <div class="contentArea">
                <form>
                    <fieldset class="accordion-inner" data-bind="visible: currentStep() >= 0 && !isListingStep() || isStepComplete(1)">
                        <legend class="legend"><span class="badge">1</span>Location Details</legend>
                        <div class="control-group warning">
                            <div class="inlineMargin">
                                <input class="inline" type="radio" name="locationSearchType" value="option1" checked> Name
                                <input class="inline" type="radio" name="locationSearchType" value="option2"> Postal Code
                                <input class="inline" type="radio" name="locationSearchType" value="option3"> Address <br style="display:none" />
                            </div>
                            <div class="controls">
                                <input class="span3 " type="text" name="locationSearch" placeholder="Enter a location name"><br style="display:none" />
                                <input class="span3 " type="text" name="locationSearch" placeholder="Enter a 6-digit postal code" style="display:none"><br style="display:none" />
                                <input class="textNo " type="text" name="locationSearch" placeholder="No." style="display:none">
                                <input class="textStreet " type="text" name="locationSearch" placeholder="Street Name" style="display:none">
                                <span class="help-inline">This is either a tip or an error.</span>
                            </div>
                        </div>
                    </fieldset> <!-- step 1-->
                    <fieldset class="accordion-inner form-inline" data-bind="visible: currentStep() >= 1 && !isListingStep() || isStepComplete(2)">
                        <legend class="legend"><span class="badge">2</span>Listing Type</legend>
                        <button class="btn">Sale</button>
                        <button class="btn">Rent</button>
                    </fieldset> <!-- step 2-->
                    <fieldset class="accordion-inner" data-bind="visible: currentStep() >= 2 && !isListingStep() || isStepComplete(3)">
                        <legend class="legend"><span class="badge">3</span>Property Details</legend>
                        <div class="btn-group">
                            <button class="btn normalSelect">Property Type</button>
                            <button data-toggle="dropdown" class="btn dropdown-toggle">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a>Private Apartment</a></li>
                                <li><a>Serviced Apartment</a></li>
                            </ul>
                        </div><br/>
                        <div class="btn-group">
                            <button class="btn normalSelect">Tenure</button>
                            <button data-toggle="dropdown" class="btn dropdown-toggle">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a>Freehold</a></li>
                                <li><a>999 years</a></li>
                                <li><a>99 years</a></li>
                            </ul>
                        </div>
                    </fieldset> <!-- step 3-->
                    <fieldset class="accordion-inner form-inline horizontal" data-bind="visible: isListingStep() || isStepComplete(4)">
                        <legend class="legend"><span class="badge">4</span>Listing Details</legend>
                        <div class="control-group warning">
                            <label class="control-label" for="listingFloor">Unit No.</label>
                            <div class="controls">
                                <input class="textUnit " type="text" name="listingFloor" placeholder="Floor"> -
                                <input class="textUnit " type="text" name="listingStack" placeholder="Stack">
                                <span class="help-inline">This is either a tip or an error.</span>
                            </div>
                        </div>
                        <div class="control-group error">
                            <label class="control-label" for="listingBuilt">Built</label>
                            <div class="controls">
                                <input class="span1 " type="text" name="listingBuilt" placeholder="Built-Up Size (sqft)">
                                <span class="label_checkbox_pair">
                                    <input type="checkbox" name="chkIsLanded" />
                                    <label for="chkIsLanded">Land Size?</label>
                                </span>
                                <span class="help-inline">This is either a tip or an error.</span>
                            </div>
                            <br>
                            <label class="control-label" for="listingLand">Land</label>
                            <input class="span1 " type="text" name="listingLand" placeholder="Land Size (sqft)">
                        </div>
                        <div class="control-group success">
                            <label class="control-label" for="listingRooms">Rooms</label>
                            <div class="controls">
                                <input class="span1 " type="text" name="listingRooms" placeholder="No. of rooms">
                                <span class="help-inline">This is either a tip or an error.</span>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="listingAsking">Price</label>
                            <div class="controls">
                                <input class="span1 " type="text" name="listingAsking" placeholder="Price">
                                <span class="label_checkbox_pair">
                                    <input type="checkbox"  name="chkIsValued" />
                                    <label for="chkIsValued">Is valued?</label>
                                </span>
                                <span class="help-inline">This is either a tip or an error.</span>
                            </div><br>
                            <label class="control-label" for="listingValue">Valuation</label>
                            <input class="span1 " type="text" name="listingValue" placeholder="Valuation Price"><br>
                            <label class="control-label" for="listingCOV">COV</label>
                            <input class="span1 " type="text" name="listingCOV" placeholder="Cash Over Valuation">
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="listingDescription">Description</label>
                            <div class="controls">
                                <textarea class="span3" name="listingDescription" placeholder="Description is seen by everyone"></textarea>
                                <span class="help-inline">This is either a tip or an error.</span>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="listingCoBrokeNotes">Co-Broke Notes</label>
                            <div class="controls">
                                <textarea class="span3" name="listingCoBrokeNotes" placeholder="Notes are seen by Realt Agents only"></textarea>
                                <span class="help-inline">This is either a tip or an error.</span>
                            </div>
                        </div>
                    </fieldset> <!-- step 4-->
                </form>
            </div>
        </section>
    </section>
    <footer class="footerBar"></footer>
</section>