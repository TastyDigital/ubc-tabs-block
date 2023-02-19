/**
 * BLOCK: Call To Action
 */
import WPSanitizeTitle from '../helper';
const { InnerBlocks, useBlockProps } = wp.blockEditor;

const Save = ( props ) => {
	const { attributes } = props;
	const { tabTitles, initialTabSelected, className, sideTabLayout, styleString } = attributes;
	const blockProps = useBlockProps.save({
		className: `ubc-accordion-tabs ${ className ? className : '' } tabs-style-${ styleString }  ${sideTabLayout && ' side-tab-layout'}`
	});

	return (
		<section
			data-selected-tab={ initialTabSelected }
			{ ...blockProps }
		>
			<ul className="ubc-accordion-tabs__tab-list" role="tablist">
				{ tabTitles.map( ( singleTitle, key ) => {
					const id = singleTitle.toLowerCase().replace( / /g, '-' );
					return (
						<li id={ id } role="presentation" key={ key }>
							{
								<a
									role="tab"
									id={ WPSanitizeTitle( singleTitle ) }
									aria-controls={ `section${ key + 1 } ` }
									aria-selected={ key === initialTabSelected }
									className="ubc-accordion-tabs__tabs-trigger js-tabs-trigger"
									href={ `#section${ key + 1 }` }
								>
									{ singleTitle }
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
