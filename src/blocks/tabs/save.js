/**
 * BLOCK: Call To Action
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const Save = ( props ) => {
	const { attributes } = props;
	const { tabs, initialTabSelected, className, sideTabLayout, styleString } = attributes;
	const blockProps = useBlockProps.save({
		className: `ubc-accordion-tabs ${ className ? className : '' } tabs-style-${ styleString }  ${sideTabLayout && ' side-tab-layout'}`
	});

	return (
		<section
			data-selected-tab={ initialTabSelected }
			{ ...blockProps }
		>
			<ul className="ubc-accordion-tabs__tab-list" role="tablist">
				{ tabs.map( ( singleTab, key ) => {
					return (
						<li role="presentation" key={ key }>
							{
								<a
									role="tab"
									aria-controls={ `section-${singleTab.id}` }
									aria-selected={ key === initialTabSelected }
									className="ubc-accordion-tabs__tabs-trigger js-tabs-trigger"
									href={ `#section-${singleTab.id}` }
								>
									{ singleTab.title }
								</a>
							}
						</li>
					);
				} ) }
			</ul>
			<InnerBlocks.Content />
		</section>
	);
};

export default Save;
